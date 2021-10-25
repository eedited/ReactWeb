import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    namespace UserRouter {
        interface MyPageRequest {
            userId: string;
        }

        interface UserExistRequest {
            userId: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface UserExistSuccessResponse{}
        interface UserExistFailureResponse{
            info: string
        }

        interface MyPageSuccessResponse extends User {
            Video: (Video & { WhoVideoUploadTag?: { tagName: string }[] })[];
            followFrom: { followingId: string }[];
            followTo?: {follerId: string}[];
            categories: { [key: string]: number };
        }

        interface MyPageFailureResponse {
            info: string;
        }

        interface UserFollowRequest {
            userId: string;
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface UserFollowSuccessResponse {}
        interface UserFollowFailureResponse {
            info: string;
        }
        type UserFollowResponse =
            | UserFollowSuccessResponse
            | UserFollowFailureResponse;

        interface MypageModifyRequest {
            description: string;
            nickname: string;
            profilePicture: string;
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface MypageModifySuccessResponse {}
        interface MypageModifyFailureResponse {
            error: Error;
        }

        interface DiscomfortRequest {
            title: string,
            description: string,
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface DiscomfortSuccessResponse{}
        interface DiscomfortFailureResponse{
            info: string;
        }
        interface SetSnsRequest {
            facebook: string
            instagram: string
            linkedin: string
            twitter: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface SetSnsSuccessResponse{}
    }

    namespace RDXUserModule {
        interface CheckFailureResponse extends AuthRouter.AuthFailureResponse {
            error: Error;
        }

        interface LogoutFailureResonse {
            error: Error;
        }

        interface StateType {
            user: AuthRouter.CheckSuccessResponse | null;
            logoutError: LogoutFailureResonse | null;
            checkError: CheckFailureResponse | null;
        }

        type ActionType = CaseReducerActions<{
            logout(state: WritableDraft<StateType>): void;
            logoutSuccess(state: WritableDraft<StateType>): void;
            logoutFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<LogoutFailureResonse>,
            ): void;
            check(state: WritableDraft<StateType>): void;
            checkSuccess(
                state: WritableDraft<StateType>,
                action: PayloadAction<AuthRouter.CheckSuccessResponse>,
            ): void;
            checkFailure(
                state: WritableDraft<StateType>,
                action: PayloadAction<RDXUserModule.CheckFailureResponse>,
            ): void;
            setUser(
                state: WritableDraft<StateType>,
                action: PayloadAction<USER>,
            ): void;
        }>;
    }
}
