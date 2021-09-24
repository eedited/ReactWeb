import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    interface Signup {
        [key: string]: string;
        userId: string;
        password: string;
        email: string;
        nickname: string;
    }

    interface Login {
        [key: string]: string;
        userId: string;
        password: string;
    }

    interface User {
        userId: string
        password: string
        birthday: Date | null
        nickname: string
        email: string
        emailToken: string
        profilePicture: string
        followerCnt: number
        description: string
        uploadVideoCnt: number
        proTag: boolean
        createdAt: Date
        updatedAt: Date
        deletedAt: Date | null
    }

    namespace AuthRouter {
        type SignupRequest = Signup;
        type LoginRequest = Login;
        interface SignupValidationRequest {
            token: string;
        }

        type CheckSuccessResponse = User;
        interface CheckFailureResponse {
            info: string;
        }
        interface AuthSuccessResponse {
            success: boolean;
        }
        interface AuthFailureResponse {
            success: boolean;
            info: string;
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SignupValidationSuccessResponse{}
        interface SignupValidationFailureResponse{
            info: string;
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SignupEmailSuccessResponse{}
        interface SignupEmailFailureResponse{
            info: string
        }
    }

    namespace RDXAuthModule {
        type SignupForm = Signup & { passwordConfirm: string };

        interface ChangeFieldType {
            form: 'signup' | 'login';
            key: string;
            value: string;
        }

        interface AuthFailureResponse extends AuthRouter.AuthFailureResponse {
            error: Error;
        }

        type ActionType = CaseReducerActions<{
            changeField(
                state: WritableDraft<StateType>,
                action: PayloadAction<changeFieldType>,
            ): void;
            intializeForm(state: WritableDraft<StateType>): void;
            signup(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthRouter.SignupRequest>,
            ): void;
            signupSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthRouter.AuthSuccessResponse>,
            ): void;
            signupFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthFailureResponse>,
            ): void;
            login(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthRouter.LoginRequest>,
            ): void;
            loginSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthRouter.AuthSuccessResponse>,
            ): void;
            loginFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthFailureResponse>,
            ): void;
        }>;

        interface StateType {
            signup: Signup & { passwordConfirm: string };
            login: Login;
            auth?: AuthRouter.AuthSuccessResponse | null;
            authError?: AuthFailureResponse | null;
        }
    }
}
