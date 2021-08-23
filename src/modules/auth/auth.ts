/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { changeFieldType, signupPayloadType, loginPayloadType, responseSuccessType, responseFailureType, authStateType, authActionType } from './authType';

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

type sliceAction = Slice<
authStateType,
{
    changeField(state: WritableDraft<authStateType>, action: PayloadAction<changeFieldType>): void;
    intializeForm(state: WritableDraft<authStateType>): void;
    signup(state: WritableDraft<authStateType>, action: PayloadAction<signupPayloadType>): void;
    signupSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>): void;
    signupFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>): void;
    login(state: WritableDraft<authStateType>, action: PayloadAction<loginPayloadType>): void;
    loginSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>): void;
    loginFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>): void;
},
'AUTH'
>;
const authSlice: sliceAction = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        changeField(state: WritableDraft<authStateType>, action: PayloadAction<changeFieldType>) {
            state[action.payload.form][action.payload.key] = action.payload.value;
        },
        intializeForm(state: WritableDraft<authStateType>) {
            state.signup.userId = '';
            state.signup.password = '';
            state.signup.passwordConfirm = '';
            state.signup.email = '';
            state.signup.nickname = '';
            state.login.userId = '';
            state.login.password = '';
            state.auth = null;
            state.authError = null;
        },
        signup(state: WritableDraft<authStateType>, action: PayloadAction<signupPayloadType>) {},
        signupSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>) {
            state.auth = action.payload;
            state.authError = null;
        },
        signupFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>) {
            state.authError = action.payload;
        },
        login(state: WritableDraft<authStateType>, action: PayloadAction<loginPayloadType>) {},
        loginSuccess(state: WritableDraft<authStateType>, action: PayloadAction<responseSuccessType>) {
            state.auth = action.payload;
            state.authError = null;
        },
        loginFailure(state: WritableDraft<authStateType>, action: PayloadAction<responseFailureType>) {
            state.authError = action.payload;
        },
    },
});
export const AUTH: string = authSlice.name;
export default authSlice.reducer;
export const authAction: authActionType = authSlice.actions;
