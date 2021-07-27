import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnType } from '../../lib/createRequestSaga';
import {
    changeFieldActionType, initializeFormActionType, authStateType, authActionType, signupActionType,
    loginActionType, responseFailureActionType, responseSuccessActionType, responseSuccessType, responseFailureType,
} from './authType';
import * as authAPI from '../../lib/api/auth';
// 액션 정의
export const CHANGE_FIELD: string = 'auth/CHANG_FIELD' as const;
export const INITIALIZE_FORM: string = 'auth/INITIALIZE_FORM' as const;
export const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE]: string[] = createRequestActionTypes('auth/SIGNUP');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE]: string[] = createRequestActionTypes('auth/LOGIN');

// 액션 생성함수 정의
type changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string})=> changeFieldActionType
export const changeField: changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string}) => ({
    type: CHANGE_FIELD,
    payload: {
        form, // TODO signup or login
        key, // state의 키값. username or password or passwordConfirm
        value, // 이번에 바뀌어야할 value
    },
});
type initializeFormFunctionType= (form: string)=> initializeFormActionType
export const initializeForm: initializeFormFunctionType = (form: string) => ({
    type: INITIALIZE_FORM,
    payload: {
        form,
    }, // 이번에 초기화가 되어야할 form, signup or login임
});

type signupFunctionType = ({
    userId, password, email, nickname,
}: {userId: string, password: string, email: string, nickname: string})=> signupActionType;
export const signup: signupFunctionType = ({
    userId, password, email, nickname,
}: {userId: string, password: string, email: string, nickname: string}) => ({
    type: SIGNUP,
    payload: {
        userId,
        password,
        email,
        nickname,
    },
});
type loginFunctionType = ({ userId, password }: {userId: string, password: string})=> loginActionType
export const login: loginFunctionType = ({ userId, password }: {userId: string, password: string}) => ({
    type: LOGIN,
    payload: {
        userId,
        password,
    },
});
type responseSuccessFunctionType = (payload: responseSuccessType|null)=> responseSuccessActionType
type responseFailureFunctionType = (payload: responseFailureType|null)=> responseFailureActionType
export const signupSuccess: responseSuccessFunctionType = (payload: responseSuccessType|null) => ({
    type: SIGNUP_SUCCESS,
    payload,
});
export const signupFailure: responseFailureFunctionType = (payload: responseFailureType|null) => ({
    type: SIGNUP_FAILURE,
    payload,
});

export const loginSuccess: responseSuccessFunctionType = (payload: responseSuccessType|null) => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const loginFailure: responseFailureFunctionType = (payload: responseFailureType|null) => ({
    type: LOGIN_FAILURE,
    payload,
});

const signupSaga: createRequestSagaReturnType = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga: createRequestSagaReturnType = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(SIGNUP, signupSaga);
    yield takeLatest(LOGIN, loginSaga);
}
// 초기 상태 정의
const initialState: authStateType = {
    signup: {
        userId: '',
        password: '',
        passwordConfirm: '',
        email: '',
        nickname: '',
    },
    login: {
        userId: '',
        password: '',
    },
    auth: null,
    authError: null,
};

// reducer 정의. immer 사용
function auth(state: authStateType = initialState, action: authActionType): authStateType {
    return produce(state, (draft: WritableDraft<authStateType>) => {
        switch (action.type) {
            case CHANGE_FIELD:
                if ((action as changeFieldActionType).payload.form === 'signup') {
                    if ((action as changeFieldActionType).payload.key === 'userId') {
                        draft.signup.userId = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'password') {
                        draft.signup.password = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'passwordConfirm') {
                        draft.signup.passwordConfirm = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'email') {
                        draft.signup.email = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'nickname') {
                        draft.signup.nickname = (action as changeFieldActionType).payload.value;
                    }
                }
                else if ((action as changeFieldActionType).payload.form === 'login') {
                    if ((action as changeFieldActionType).payload.key === 'userId') {
                        draft.login.userId = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'password') {
                        draft.login.password = (action as changeFieldActionType).payload.value;
                    }
                }
                // 나는 쓰레기다 나는 쓰레기다 나는 쓰레기다
                // state의 state[form][key]를 action.value로 바꾼다.
                return draft;
            case INITIALIZE_FORM:
                draft[(action as initializeFormActionType).payload.form] = initialState[(action as initializeFormActionType).payload.form]; // 이번 form 녀석을 바꿔버린다.
                draft.authError = null;
                draft.auth = null;
                return draft;
            case SIGNUP_SUCCESS:
                draft.authError = null;
                draft.auth = (action as responseSuccessActionType).payload;
                return draft;
            case SIGNUP_FAILURE:
                draft.authError = (action as responseFailureActionType).payload;
                return draft;
            case LOGIN_SUCCESS:
                draft.authError = null;
                draft.auth = (action as responseSuccessActionType).payload;
                return draft;
            case LOGIN_FAILURE:
                draft.authError = (action as responseFailureActionType).payload;
                return draft;
            default:
                return draft;
        }
    });
}
export default auth;
