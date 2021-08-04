import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
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
export type authActionType = CaseReducerActions<{
    changeField(state: WritableDraft<authStateType>, action: PayloadAction<changeFieldType>): void;
    intializeForm(state: WritableDraft<authStateType>): void;
    signup(state: WritableDraft<authStateType>, action: PayloadAction<signupPayloadType>): void;
    signupSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>): void;
    signupFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>): void;
    login(state: WritableDraft<authStateType>, action: PayloadAction<loginPayloadType>): void;
    loginSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>): void;
    loginFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>): void;
}>
export interface authStateType{
    signup: signupProp&{passwordConfirm: string},
    login: loginProp
    auth?: responseSuccessType|null
    authError?: responseFailureType|null
}
