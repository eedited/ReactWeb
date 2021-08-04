import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export interface userType{
    userId: string
}
export interface userStateType{
    user: userType|null
}
export type userActionType = CaseReducerActions<{
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
    logout(state: WritableDraft<userStateType>): void;
}>
