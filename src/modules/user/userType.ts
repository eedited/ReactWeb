import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export interface userStateType{
    user: string|null
}

export type userActionType = CaseReducerActions<{
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<{
        userId: string;
    }>): void;
    logout(state: WritableDraft<userStateType>, action: PayloadAction<{
        userId: string;
    }>): void;
}>
