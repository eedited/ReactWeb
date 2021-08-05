import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export interface userType{
    userId: string
}
export interface userStateType{
    user: userType|null
    userError: Error|null
}
export interface logoutFailureType{
    error: Error
}
export type userActionType = CaseReducerActions<{
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
    logout(state: WritableDraft<userStateType>): void;
}>
