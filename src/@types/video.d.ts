import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global{
    interface TAG{
        name: string,
    }
    interface VIDEO_TAG{
        videoTag: TAG[]
    }
    interface VIDEO {
        id: string
        uploader: string
        title: string
        discription: string
        url: string
        thumbnail: string
        likeCnt: number
        viewCnt: number
        createdAt: Date
        updatedAt: Date
        deleted: Date | null
        User: {
            nickname: string
        }
        WhatVideoUpload?: {
            liker: string
        }[]
    }
    interface VIDEO_UPLOAD{
        title: string,
        discription: string,
        url: string,
        thumbnail: string
        tags: string[]
    }
    namespace videoRouter{
        interface videoRequest{
            videoId: string
        }
        type videoSuccessResponse = VIDEO&{ WhatVideoUploadTag: {tagName: string}[]}
        interface videoFailureResponse{
            info: string
        }
        type videoResponse = videoSuccessResponse|videoFailureResponse;

        interface videoListRequest{
            criteria: string
            page: number
        }
        interface videoListSuccessResponse{
            videos: VIDEO[]
        }
        interface videoListFailureResponse{
            info: string
        }
        type videoListResponse = videoListSuccessResponse|videoListFailureResponse;

        type videoUploadRequest = VIDEO_UPLOAD
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface videoUploadSuccessResponse {}
        interface videoUploadFailureResponse {
            info: string
        }
        type videoUploadResponse = videoUploadSuccessResponse | videoUploadFailureResponse;

        interface userVideoRequest{
            uploader: string
        }
        interface userVideoSuccessResponse{
            videos: VIDEO[]
        }
        interface userVideoFailureResponse{
            info: string
        }
        type userVideoResponse = userVideoSuccessResponse | userVideoFailureResponse

        interface videoLikeRequest{
            videoId: string
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface videoLikeSuccessResponse{}
        interface videoLikeFailureResponse{
            info: string
        }
        type videoLikeResponse = videoLikeSuccessResponse | videoLikeFailureResponse

    }
    namespace videoModule{

        interface videoFailureResponse extends videoRouter.videoFailureResponse{
            error: Error
        }
        interface videoListFailureResponse extends videoRouter.videoListFailureResponse{
            error: Error
        }
        interface videoUploadFailureResponse extends videoRouter.videoUploadFailureResponse{
            error: Error
        }
        interface userVideoFailureResponse extends videoRouter.userVideoFailureResponse{
            error: Error
        }
        export interface StateType{
            video: videoRouter.videoSuccessResponse|null
            videoList: videoRouter.videoListSuccessResponse|null
            videoUserUpload: videoRouter.userVideoSuccessResponse|null
            videoUploadSuccess: videoRouter.videoUploadSuccessResponse|null
            getVideoError: videoFailureResponse|null
            videoUploadError: videoUploadFailureResponse|null
            videoUserUploadError: userVideoFailureResponse|null
        }

        export type ActionType=CaseReducerActions<{
            videoClear(state: WritableDraft<StateType>): void;
            video(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoRequest>): void;
            videoSuccess(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoSuccessResponse>): void;
            videoFailure(state: WritableDraft<StateType>, action: PayloadAction<videoModule.videoFailureResponse>): void;
            videoList(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoListRequest>): void;
            videoListSuccess(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoListSuccessResponse>): void;
            videoListFailure(state: WritableDraft<StateType>, action: PayloadAction<videoModule.videoListFailureResponse>): void;
            videoUpload(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoUploadRequest>): void;
            videoUploadSuccess(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.videoUploadSuccessResponse>): void;
            videoUploadFailure(state: WritableDraft<StateType>, action: PayloadAction<videoModule.videoUploadFailureResponse>): void;
            videoUserUploaded(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.userVideoRequest>): void;
            videoUserUploadedSuccess(state: WritableDraft<StateType>, action: PayloadAction<videoRouter.userVideoSuccessResponse>): void
            videoUserUploadedFailure(state: WritableDraft<StateType>, action: PayloadAction<videoModule.userVideoFailureResponse>): void
        }>
    }

}
