import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { userActionType, userStateType } from './userType';

const initialState: userStateType = {
    user: null,
};
type userSliceType = Slice<userStateType, {
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<{
        userId: string;
    }>): void;
    logout(state: WritableDraft<userStateType>, action: PayloadAction<{
        userId: string;
    }>): void;
}, 'USER'>
const userSlice: userSliceType = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        setUser(state: WritableDraft<userStateType>, action: PayloadAction<{userId: string}>) {
            state.user = action.payload.userId;
        },
        logout(state: WritableDraft<userStateType>, action: PayloadAction<{userId: string}>) {
            state.user = null;
        },
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: userActionType = userSlice.actions;
