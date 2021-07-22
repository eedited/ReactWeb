import { CHANGE_FIELD } from './auth';

export interface changeFieldActionType{
    type: typeof CHANGE_FIELD,
    form: string,
    key: string,
    value: string
}

export interface initializeFormActionType{
    type: string,
    form: string
}
export type authActionType =
    |initializeFormActionType
    |changeFieldActionType;

export interface authStateType{
    [key: string]: {
        [key2: string]: string|undefined
    }
    register: {
        username: string,
        password: string,
        passwordConfirm: string,
    },
    login: {
        username: string,
        password: string
    }
}
