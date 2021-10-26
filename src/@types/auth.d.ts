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
        logInType: string | null
        profilePicture: string
        followerCnt: number
        description: string
        uploadVideoCnt: number
        block: boolean
        facebook: string | null
        instagram: string | null
        linkedin: string | null
        twitter: string | null
        admin: boolean
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

        interface CheckSuccessResponse {
            userId: string
            birthday: Date | null
            nickname: string
            email: string
            emailToken: string
            profilePicture: string
            description: string
            facebook: string|null
            instagram: string|null
            linkedin: string|null
            twitter: string|null
            proTag: boolean
        }
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
        interface ChangePasswordRequest{
            currentPassword: string,
            newPassword: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface ChangePasswordSuccessResponse{}
        interface ChangePasswordFailureResponse{
            error: Error
        }
        interface DeleteuserRequest{
            userId: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface DeleteuserSuccessResponse{}

        interface GoogleLoginRequest{
            tokenId: string
            googleId: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface GoogleLoginSuccessResponse {}
        interface GoogleLoginFailureResponse {
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
