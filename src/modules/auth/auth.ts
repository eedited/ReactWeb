import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { takeLatest, ForkEffect } from 'redux-saga/effects';
import {
    changeFieldActionType, initializeFormActionType, authStateType, authActionType, signupActionType,
    loginActionType, responseFailureActionType, responseSuccessActionType, responseSuccessType, responseFailureType,
} from './authType';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';
// 액션 정의
export const CHANGE_FIELD: 'auth/CHANGE_FIELD' = 'auth/CHANGE_FIELD' as const;
export const INITIALIZE_FORM: 'auth/INITIALIZE_FORM' = 'auth/INITIALIZE_FORM' as const;

export const SIGNUP: 'auth/SIGNUP' = 'auth/SIGNUP' as const;
export const SIGNUP_SUCCESS: 'auth/SIGNUP_SUCCESS' = 'auth/SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE: 'auth/SIGNUP_FAILURE' = 'auth/SIGNUP_FAILURE' as const;

export const LOGIN: 'auth/SIGNUP' = 'auth/SIGNUP' as const;
export const LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS' = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE: 'auth/LOGIN_FAILURE' = 'auth/LOGIN_FAILURE' as const;

// 액션 생성함수 정의
type changeFieldFunctionType = ({ form, key, value }: {form: 'signup'|'login', key: string, value: string})=> changeFieldActionType
export const changeField: changeFieldFunctionType = ({ form, key, value }: {form: 'signup'|'login', key: string, value: string}) => ({
    type: CHANGE_FIELD,
    payload: {
        form, // TODO signup or login
        key, // state의 키값. username or password or passwordConfirm
        value, // 이번에 바뀌어야할 value
    },
});
type initializeFormFunctionType= (form: 'signup'|'login')=> initializeFormActionType
export const initializeForm: initializeFormFunctionType = (form: 'signup'|'login') => ({
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

const signupSaga: createRequestSagaReturnType<authAPI.authProp, authAPI.authReturnProp> = createRequestSaga<authAPI.authProp, authAPI.authReturnProp>(SIGNUP, authAPI.signup);
const loginSaga: createRequestSagaReturnType<authAPI.authProp, authAPI.authReturnProp> = createRequestSaga<authAPI.authProp, authAPI.authReturnProp>(LOGIN, authAPI.login);
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
                draft[action.payload.form][action.payload.key] = action.payload.value;
                return draft;
            case INITIALIZE_FORM:
                if (action.payload.form === 'login') draft.login = initialState.login; // 이번 form 녀석을 바꿔버린다.
                else if (action.payload.form === 'signup') draft.signup = initialState.signup; // 이번 form 녀석을 바꿔버린다.
                draft.authError = null;
                draft.auth = null;
                return draft;
            case SIGNUP_SUCCESS:
                draft.authError = null;
                draft.auth = action.payload;
                return draft;
            case SIGNUP_FAILURE:
                draft.authError = action.payload;
                return draft;
            case LOGIN_SUCCESS:
                draft.authError = null;
                draft.auth = action.payload;
                return draft;
            case LOGIN_FAILURE:
                draft.authError = action.payload;
                return draft;
            default:
                return draft;
        }
    });
}
export default auth;
