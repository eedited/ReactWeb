import { authProp } from '../../lib/api/auth';
import { CHANGE_FIELD } from './auth';

export interface responseType{
    __id: string,
    username: string,
    __v: string
}
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
export interface registerSuccessActionType{
    type: string
    payload?: {
        auth: responseType|null
    }
}
export interface registerFailureActionType{
    type: string
    payload?: {
        error: Error|null
    }
}
export interface loginSuccessActionType{
    type: string
    payload?: {
        auth: responseType|null
    }
}
export interface loginFailureActionType{
    type: string
    payload?: {
        error: Error|null
    }
}
export type authActionType =
    |initializeFormActionType
    |changeFieldActionType
    |registerActionType
    |registerSuccessActionType
    |registerFailureActionType
    |loginSuccessActionType
    |loginFailureActionType

export interface authStateType{
    [key: string]: {
        [key2: string]: string
    }|unknown

    register: {
        userId: string,
        password: string,
        passwordConfirm: string,
        email: string
    },
    login: {
        userId: string,
        password: string
    }
    auth?: responseType|null
    authError?: Error|null

}
