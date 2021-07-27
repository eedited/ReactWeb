import { authProp } from '../../lib/api/auth';

export interface responseSuccessType{
    success: boolean
}
export interface responseFailureType {
    success: boolean,
    info: string,
    error: Error
}

export interface changeFieldActionType{
    type: string,
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
export interface signupActionType{
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
    payload: responseSuccessType|null
}
export interface responseFailureActionType{
    type: string
    payload: responseFailureType|null
}

export type authActionType =
    |initializeFormActionType
    |changeFieldActionType
    |signupActionType
    |loginActionType
    |responseSuccessActionType
    |responseFailureActionType

export interface signupFormType{
    [key: string]: string
    userId: string,
    password: string,
    passwordConfirm: string,
    email: string
    nickname: string
}
export interface loginFormType{
    [key: string]: string
    userId: string,
    password: string
}
export interface authStateType{
    [key: string]: {
        [key2: string]: string
    }|undefined|responseFailureType|responseSuccessType|null

    signup: signupFormType,
    login: loginFormType
    auth?: responseSuccessType|null
    authError?: responseFailureType|null
}
