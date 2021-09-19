import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    namespace UserRouter {
        interface MyPageRequest {
            userId: string;
        }

        interface MyPageSuccessResponse extends User {
            Video: (Video & { WhoVideoUploadTag?: { tagName: string }[] })[];
            followFrom: { followingId: string }[];
            tags: { [key: string]: number };
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
    }

    namespace RDXUserModule {
        interface CheckFailureResponse extends AuthRouter.AuthFailureResponse {
            error: Error;
        }

        interface LogoutFailureResonse {
            error: Error;
        }

        interface StateType {
            user: User | null;
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
