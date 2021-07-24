import { authProp } from '../../lib/api/auth';
import { CHANGE_FIELD } from './auth';

export interface responseSuccessType{
    success: boolean
}
export type responseFailureType = Error

export interface changeFieldActionType{
    type: typeof CHANGE_FIELD,
    payload: {
        form: string,
        key: string,
        value: string
    }
}
export interface initializeFormActionType{
    type: string,
    payload: {
        form: string
    }
}
export interface registerActionType{
    type: string,
    payload: authProp;
}
export interface loginActionType{
    type: string,
    payload: {
        userId: string,
        password: string
    }
}
export interface responseSuccessActionType{
    type: string
    payload?: responseSuccessType|null
}
export interface responseFailureActionType{
    type: string
    payload?: responseFailureType|null
}

export type authActionType =
    |initializeFormActionType
    |changeFieldActionType
    |registerActionType
    |loginActionType
    |responseSuccessActionType
    |responseFailureActionType

export interface signupFormType{
    userId: string,
    password: string,
    passwordConfirm: string,
    email: string
}
export interface loginFormType{
    userId: string,
    password: string
}
export interface authStateType{
    [key: string]: {
        [key2: string]: string
    }|unknown

    register: signupFormType,
    login: loginFormType
    auth?: responseSuccessType|null
    authError?: responseFailureType|null
}
