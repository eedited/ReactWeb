import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { userActionType, userStateType, userType } from './userType';

const initialState: userStateType = {
    user: null,
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
    },
});

export const USER: string = userSlice.name;
export default userSlice.reducer;
export const userAction: userActionType = userSlice.actions;
