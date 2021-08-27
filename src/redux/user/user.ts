/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: userModule.StateType = {
    user: null,
    checkError: null,
    logoutError: null,
};
type userSliceType=Slice<userModule.StateType, {
    logout(state: WritableDraft<userModule.StateType>): void;
    logoutSuccess(state: WritableDraft<userModule.StateType>): void;
    logoutFailure(state: WritableDraft<userModule.StateType>, action: PayloadAction<userModule.logoutFailureResonse>): void;
    check(state: WritableDraft<userModule.StateType>): void;
    checkSuccess(state: WritableDraft<userModule.StateType>, action: PayloadAction<authRouter.checkSuccessResponse>): void;
    checkFailure(state: WritableDraft<userModule.StateType>, action: PayloadAction<userModule.checkFailureResponse>): void;
    setUser(state: WritableDraft<userModule.StateType>, action: PayloadAction<authRouter.checkSuccessResponse>): void
}, 'USER'>;
const userSlice: userSliceType = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        logout(state: WritableDraft<userModule.StateType>) {
            state.user = null;
        },
        logoutSuccess(state: WritableDraft<userModule.StateType>) {},
        logoutFailure(state: WritableDraft<userModule.StateType>, action: PayloadAction<userModule.logoutFailureResonse>) {
            state.logoutError = action.payload;
        },
        check(state: WritableDraft<userModule.StateType>) {},
        checkSuccess(state: WritableDraft<userModule.StateType>, action: PayloadAction<authRouter.checkSuccessResponse>) {
            state.user = action.payload;
        },
        checkFailure(state: WritableDraft<userModule.StateType>, action: PayloadAction<userModule.checkFailureResponse>) {
            state.checkError = action.payload;
            if (state.user) {
                state.user = null;
                localStorage.removeItem('user');
            }
        },
        setUser(state: WritableDraft<userModule.StateType>, action: PayloadAction<authRouter.checkSuccessResponse>) {
            state.user = action.payload;
        },
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: userModule.ActionType = userSlice.actions;
