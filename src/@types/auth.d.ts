import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    interface SIGNUP{
        [key: string]: string;
        userId: string;
        password: string;
        email: string;
        nickname: string;
    }
    interface LOGIN{
        [key: string]: string;
        userId: string;
        password: string;
    }
    interface USER{
        userId: string
        password: string
        birthday: Date | null
        nickname: string
        email: string
        profilePicture: string
        followerCnt: number
        uploadVideoCnt: number
        proTag: boolean
        createdAt: Date
        updatedAt: Date
        deletedAt: Date | null
    }

    namespace authRouter{
        type singupRequest = SIGNUP
        type loginRequest = LOGIN
        type checkSuccessResponse = USER
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
        type SIGNUPFORM = SIGNUP&{passwordConfirm: string}
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
            signup: SIGNUP & { passwordConfirm: string };
            login: LOGIN;
            auth?: authRouter.authSuccessResponse | null;
            authError?: authFailureResponse | null;
        }
    }
}
