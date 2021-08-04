import {
    authFailureReturnProp, authSuccessReturnProp, loginProp, signupProp,
} from '../../lib/api/auth';

export interface changeFieldType {
    form: 'signup' | 'login',
    key: string,
    value: string
}
export type signupPayloadType = signupProp;
export type loginPayloadType = loginProp;
export type responseSuccessType = authSuccessReturnProp;
export interface responseFailureType extends authFailureReturnProp{
    error: Error
}

export interface authStateType{
    signup: signupProp&{passwordConfirm: string},
    login: loginProp
    auth?: responseSuccessType|null
    authError?: responseFailureType|null
}
