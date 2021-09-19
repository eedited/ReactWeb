/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: RDXAuthModule.StateType = {
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

type SliceAction = Slice<RDXAuthModule.StateType, {
    changeField(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<RDXAuthModule.ChangeFieldType>): void;
    intializeForm(state: WritableDraft<RDXAuthModule.StateType>): void;
    signup(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.SignupRequest>): void;
    signupSuccess(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.AuthSuccessResponse>): void;
    signupFailure(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<RDXAuthModule.AuthFailureResponse>): void;
    login(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.LoginRequest>): void;
    loginSuccess(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.AuthSuccessResponse>): void;
    loginFailure(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.AuthFailureResponse>): void;
}, 'AUTH'>;

const authSlice: SliceAction = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        changeField(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<RDXAuthModule.ChangeFieldType>) {
            state[action.payload.form][action.payload.key] = action.payload.value;
        },
        intializeForm(state: WritableDraft<RDXAuthModule.StateType>) {
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
        signup(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.SignupRequest>) {},
        signupSuccess(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.AuthSuccessResponse>) {
            state.auth = action.payload;
            state.authError = null;
        },
        signupFailure(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<RDXAuthModule.AuthFailureResponse>) {
            state.authError = action.payload;
        },
        login(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.LoginRequest>) {},
        loginSuccess(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<AuthRouter.AuthSuccessResponse>) {
            state.auth = action.payload;
            state.authError = null;
        },
        loginFailure(state: WritableDraft<RDXAuthModule.StateType>, action: PayloadAction<RDXAuthModule.AuthFailureResponse>) {
            state.authError = action.payload;
        },
    },
});

export const AUTH: string = authSlice.name;
export default authSlice.reducer;
export const authAction: RDXAuthModule.ActionType = authSlice.actions;
