/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: RDXUserModule.StateType = {
    user: null,
    checkError: null,
    logoutError: null,
};

type userSliceType = Slice<RDXUserModule.StateType, {
    logout(state: WritableDraft<RDXUserModule.StateType>): void;
    logoutSuccess(state: WritableDraft<RDXUserModule.StateType>): void;
    logoutFailure(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<RDXUserModule.LogoutFailureResonse>): void;
    check(state: WritableDraft<RDXUserModule.StateType>): void;
    checkSuccess(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<AuthRouter.CheckSuccessResponse>): void;
    checkFailure(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<RDXUserModule.CheckFailureResponse>): void;
    setUser(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<AuthRouter.CheckSuccessResponse>): void
}, 'USER'>;
const userSlice: userSliceType = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        logout(state: WritableDraft<RDXUserModule.StateType>) {},
        logoutSuccess(state: WritableDraft<RDXUserModule.StateType>) {
            state.user = null;
        },
        logoutFailure(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<RDXUserModule.LogoutFailureResonse>) {
            state.logoutError = action.payload;
            state.user = null;
        },
        check(state: WritableDraft<RDXUserModule.StateType>) {},
        checkSuccess(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<AuthRouter.CheckSuccessResponse>) {
            state.user = action.payload;
        },
        checkFailure(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<RDXUserModule.CheckFailureResponse>) {
            state.checkError = action.payload;
            if (state.user) {
                state.user = null;
            }
        },
        setUser(state: WritableDraft<RDXUserModule.StateType>, action: PayloadAction<AuthRouter.CheckSuccessResponse>) {
            state.user = action.payload;
        },
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: RDXUserModule.ActionType = userSlice.actions;
