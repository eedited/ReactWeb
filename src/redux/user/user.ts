/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import {
    checkFailureType,
    logoutFailureType, userActionType, userStateType, userType,
} from './userType';

const initialState: userStateType = {
    user: null,
    checkError: null,
    logoutError: null,
};
type userSliceType=Slice<userStateType, {
    logout(state: WritableDraft<userStateType>): void;
    logoutSuccess(state: WritableDraft<userStateType>): void;
    logoutFailure(state: WritableDraft<userStateType>, action: PayloadAction<logoutFailureType>): void;
    check(state: WritableDraft<userStateType>): void;
    checkSuccess(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
    checkFailure(state: WritableDraft<userStateType>, action: PayloadAction<checkFailureType>): void;
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void
}, 'USER'>;
const userSlice: userSliceType = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        logout(state: WritableDraft<userStateType>) {
            state.user = null;
        },
        logoutSuccess(state: WritableDraft<userStateType>) {},
        logoutFailure(state: WritableDraft<userStateType>, action: PayloadAction<logoutFailureType>) {
            state.logoutError = action.payload.error;
        },
        check(state: WritableDraft<userStateType>) {},
        checkSuccess(state: WritableDraft<userStateType>, action: PayloadAction<userType>) {
            state.user = action.payload;
        },
        checkFailure(state: WritableDraft<userStateType>, action: PayloadAction<checkFailureType>) {
            state.checkError = action.payload;
            if (state.user) {
                state.user = null;
                localStorage.removeItem('user');
            }
        },
        setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>) {
            state.user = action.payload;
        },
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: userActionType = userSlice.actions;
