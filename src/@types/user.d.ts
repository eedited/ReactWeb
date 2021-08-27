import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    namespace userModule{
        interface checkFailureResponse extends authRouter.authFailureResponse{
            error: Error
        }
        interface logoutFailureResonse{
            error: Error
        }
        interface StateType {
            user: USER|null
            logoutError: logoutFailureResonse|null
            checkError: checkFailureResponse|null
        }
        type ActionType = CaseReducerActions<{
            logout(state: WritableDraft<StateType>): void;
            logoutSuccess(state: WritableDraft<StateType>): void;
            logoutFailure(state: WritableDraft<StateType>, action: PayloadAction<logoutFailureResonse>): void;
            check(state: WritableDraft<StateType>): void;
            checkSuccess(state: WritableDraft<StateType>, action: PayloadAction<authRouter.checkSuccessResponse>): void;
            checkFailure(state: WritableDraft<StateType>, action: PayloadAction<userModule.checkFailureResponse>): void;
            setUser(state: WritableDraft<StateType>, action: PayloadAction<USER>): void;
        }>
    }
}
