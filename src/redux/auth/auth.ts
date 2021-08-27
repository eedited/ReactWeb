/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: authModule.StateType = {
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

type sliceAction = Slice<authModule.StateType,
{
    changeField(state: WritableDraft<authModule.StateType>, action: PayloadAction<authModule.changeFieldType>): void;
    intializeForm(state: WritableDraft<authModule.StateType>): void;
    signup(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.singupRequest>): void;
    signupSuccess(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.authSuccessResponse>): void;
    signupFailure(state: WritableDraft<authModule.StateType>, action: PayloadAction<authModule.authFailureResponse>): void;
    login(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.loginRequest>): void;
    loginSuccess(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.authSuccessResponse>): void;
    loginFailure(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.authFailureResponse>): void;
},
'AUTH'
>;
const authSlice: sliceAction = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {
        changeField(state: WritableDraft<authModule.StateType>, action: PayloadAction<authModule.changeFieldType>) {
            state[action.payload.form][action.payload.key] = action.payload.value;
        },
        intializeForm(state: WritableDraft<authModule.StateType>) {
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
        signup(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.singupRequest>) {},
        signupSuccess(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.authSuccessResponse>) {
            state.auth = action.payload;
            state.authError = null;
        },
        signupFailure(state: WritableDraft<authModule.StateType>, action: PayloadAction<authModule.authFailureResponse>) {
            state.authError = action.payload;
        },
        login(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.loginRequest>) {},
        loginSuccess(state: WritableDraft<authModule.StateType>, action: PayloadAction<authRouter.authSuccessResponse>) {
            state.auth = action.payload;
            state.authError = null;
        },
        loginFailure(state: WritableDraft<authModule.StateType>, action: PayloadAction<authModule.authFailureResponse>) {
            state.authError = action.payload;
        },
    },
});
export const AUTH: string = authSlice.name;
export default authSlice.reducer;
export const authAction: authModule.ActionType = authSlice.actions;
