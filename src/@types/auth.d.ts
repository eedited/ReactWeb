import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    namespace authRouter{
        interface singupRequest {
            [key: string]: string;
            userId: string;
            password: string;
            email: string;
            nickname: string;
        }
        interface loginRequest {
            [key: string]: string;
            userId: string;
            password: string;
        }
        interface checkSuccessResponse {
            userId: string;
            nickname: string;
            email: string;
            profilePicture: string;
            proTag: boolean;
        }
        interface checkFailureResponse {
            info: string;
        }
        type checkResponse = checkSuccessResponse | checkSuccessResponse;
        interface authSuccessResponse {
            success: boolean;
        }
        interface authFailureResponse {
            success: boolean;
            info: string;
        }
        type authResponse = authSuccessResponse | authFailureResponse;
    }
    namespace authModule{
        interface changeFieldType {
            form: 'signup' | 'login';
            key: string;
            value: string;
        }
        interface authFailureResponse extends authRouter.authFailureResponse {
            error: Error;
        }

        type ActionType = CaseReducerActions<{
            changeField(state: WritableDraft<StateType>, action: PayloadAction<changeFieldType>): void;
            intializeForm(state: WritableDraft<StateType>): void;
            signup(state: WritableDraft<StateType>, action: PayloadAction<authRouter.singupRequest>): void;
            signupSuccess(state: WritableDraft<StateType>, action: PayloadAction<authRouter.authSuccessResponse>): void;
            signupFailure(state: WritableDraft<StateType>, action: PayloadAction<authFailureResponse>): void;
            login(state: WritableDraft<StateType>, action: PayloadAction<authRouter.loginRequest>): void;
            loginSuccess(state: WritableDraft<StateType>, action: PayloadAction<authRouter.authSuccessResponse>): void;
            loginFailure(state: WritableDraft<StateType>, action: PayloadAction<authFailureResponse>): void;
        }>;
        interface StateType {
            signup: authRouter.singupRequest & { passwordConfirm: string };
            login: authRouter.loginRequest;
            auth?: authRouter.authSuccessResponse | null;
            authError?: authFailureResponse | null;
        }
    }
}
