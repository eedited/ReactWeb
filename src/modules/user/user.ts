/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import {
    logoutFailureType, userActionType, userStateType, userType,
} from './userType';

const initialState: userStateType = {
    user: null,
    userError: null,
};
type userSliceType = Slice<userStateType, {
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
    logout(state: WritableDraft<userStateType>): void;
}, 'USER'>
const userSlice: userSliceType = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>) {
            state.user = action.payload;
        },
        logout(state: WritableDraft<userStateType>) {
            state.user = null;
        },
        logoutSuccess(state: WritableDraft<userStateType>) {},
        logoutFailure(state: WritableDraft<userStateType>, action: PayloadAction<logoutFailureType>) {
            state.userError = action.payload.error;
        },
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: userActionType = userSlice.actions;
