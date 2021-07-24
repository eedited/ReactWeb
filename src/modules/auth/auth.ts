import produce from 'immer';
import { current, WritableDraft } from 'immer/dist/internal';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnType } from '../../lib/createRequestSaga';
import {
    changeFieldActionType, initializeFormActionType, authStateType, authActionType, registerActionType,
    registerSuccessActionType, registerFailureActionType, loginFailureActionType, loginSuccessActionType, loginActionType,
} from './authType';
import * as authAPI from '../../lib/api/auth';
// 액션 정의
export const CHANGE_FIELD: string = 'auth/CHANG_FIELD' as const;
export const INITIALIZE_FORM: string = 'auth/INITIALIZE_FORM' as const;
export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE]: string[] = createRequestActionTypes('auth/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE]: string[] = createRequestActionTypes('auth/LOGIN');

// 액션 생성함수 정의
type changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string})=> changeFieldActionType
export const changeField: changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string}) => ({
    type: CHANGE_FIELD,
    payload: {
        form, // TODO register or login
        key, // state의 키값. username or password or passwordConfirm
        value, // 이번에 바뀌어야할 value
    },
});
type initializeFormFunctionType= (form: string)=> initializeFormActionType
export const initializeForm: initializeFormFunctionType = (form: string) => ({
    type: INITIALIZE_FORM,
    payload: {
        form,
    }, // 이번에 초기화가 되어야할 form, register or login임
});

type registerFunctionType = ({ userId, password, email }: {userId: string, password: string, email: string})=> registerActionType;
export const register: registerFunctionType = ({ userId, password, email }: {userId: string, password: string, email: string}) => ({
    type: REGISTER,
    payload: {
        userId,
        password,
        email,
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
export const registerSuccess: ()=> registerSuccessActionType = () => ({
    type: REGISTER_SUCCESS,
});

export const registerFailure: ()=> registerFailureActionType = () => ({
    type: REGISTER_FAILURE,
});

export const loginSuccess: ()=> loginFailureActionType = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure: ()=> loginSuccessActionType = () => ({
    type: LOGIN_FAILURE,
});
// 초기 상태 정의
const registerSaga: createRequestSagaReturnType = createRequestSaga(REGISTER, authAPI.register);
const loginSaga: createRequestSagaReturnType = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState: authStateType = {
    register: {
        userId: '',
        password: '',
        passwordConfirm: '',
        email: '',
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
                if ((action as changeFieldActionType).payload.form === 'register') {
                    if ((action as changeFieldActionType).payload.key === 'userId') {
                        draft.register.userId = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'password') {
                        draft.register.password = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'passwordConfirm') {
                        draft.register.passwordConfirm = (action as changeFieldActionType).payload.value;
                    }
                    if ((action as changeFieldActionType).payload.key === 'email') {
                        draft.register.email = (action as changeFieldActionType).payload.value;
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
                return draft;
            case REGISTER_SUCCESS:
                draft.authError = null;
                if (typeof ((action as registerSuccessActionType).payload) !== undefined) {
                    draft.auth = (action as registerSuccessActionType).payload?.auth;
                }
                return draft;
            case REGISTER_FAILURE:
                if ((action as registerFailureActionType).payload !== undefined) {
                    draft.authError = (action as registerFailureActionType).payload?.error;
                }
                return draft;
            case LOGIN_SUCCESS:
                draft.authError = null;
                if ((action as registerSuccessActionType).payload !== undefined) {
                    draft.auth = (action as registerSuccessActionType).payload?.auth;
                }
                return draft;
            case LOGIN_FAILURE:
                if ((action as registerFailureActionType).payload !== undefined) {
                    draft.authError = (action as registerFailureActionType).payload?.error;
                }
                return draft;
            default:
                return draft;
        }
    });
}
export default auth;
