import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { checkFailureReturnProp, checkSuccessReturnProp } from '../../library/api/auth';

export type userType = checkSuccessReturnProp
export interface logoutFailureType{
    error: Error
}
export interface checkFailureType extends checkFailureReturnProp{
    error: Error
}
export interface userStateType{
    user: userType|null
    logoutError: Error|null
    checkError: checkFailureType|null
}

export type userActionType = CaseReducerActions<{
    logout(state: WritableDraft<userStateType>): void;
    logoutSuccess(state: WritableDraft<userStateType>): void;
    logoutFailure(state: WritableDraft<userStateType>, action: PayloadAction<logoutFailureType>): void;
    check(state: WritableDraft<userStateType>): void;
    checkSuccess(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
    checkFailure(state: WritableDraft<userStateType>, action: PayloadAction<checkFailureType>): void;
    setUser(state: WritableDraft<userStateType>, action: PayloadAction<userType>): void;
}>
