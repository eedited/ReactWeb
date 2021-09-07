/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: videoModule.StateType = {
    video: null,
    videoList: null,
    getVideoError: null,
    videoUploadError: null,
    videoUserUpload: null,
    videoUserUploadError: null,
    videoUploadSuccess: null,
    videoModifySuccess: null,
    videoModifyError: null,
};
type videoSliceType = Slice<videoModule.StateType, {
    videoClear(state: WritableDraft<videoModule.StateType>): void;
    video(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoRequest>): void;
    videoSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoSuccessResponse>): void;
    videoFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoFailureResponse>): void;
    videoList(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoListRequest>): void;
    videoListSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoListSuccessResponse>): void;
    videoListFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoListFailureResponse>): void;
    videoUpload(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoUploadRequest>): void;
    videoUploadSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoUploadSuccessResponse>): void;
    videoUploadFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoUploadFailureResponse>): void;
    videoUserUploaded(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.userVideoRequest>): void;
    videoUserUploadedSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.userVideoSuccessResponse>): void
    videoUserUploadedFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.userVideoFailureResponse>): void
    videoModify(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoModifyRequest>): void;
    videoModifySuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoModifySuccessResponse>): void;
    videoModifyFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoModifyFailureResponse>): void;
}, 'VIDEO'>

const videoSlice: videoSliceType = createSlice({
    name: 'VIDEO',
    initialState,
    reducers: {
        videoClear(state: WritableDraft<videoModule.StateType>) {
            state.videoList = null;
            state.video = null;
            state.videoUploadSuccess = null;
            state.getVideoError = null;
            state.videoUploadError = null;
            state.videoUserUpload = null;
            state.videoUserUploadError = null;
            state.videoModifyError = null;
            state.videoModifySuccess = null;
        },

        video(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoRequest>) {},
        videoSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoSuccessResponse>) {
            state.video = action.payload;
        },
        videoFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoFailureResponse>) {
            state.getVideoError = action.payload;
        },

        videoList(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoListRequest>) {},
        videoListSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoListSuccessResponse>) {
            if (state.videoList == null) {
                state.videoList = { videos: action.payload.videos };
            }
            else {
                state.videoList.videos = state.videoList.videos.concat(action.payload.videos);
            }
        },
        videoListFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoFailureResponse>) {
            state.getVideoError = action.payload;
        },

        videoUpload(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoUploadRequest>) {},
        videoUploadSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoUploadSuccessResponse>) {
            state.videoUploadSuccess = action.payload;
        },
        videoUploadFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoUploadFailureResponse>) {
            state.videoUploadError = action.payload;
        },

        videoUserUploaded(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.userVideoRequest>) {},
        videoUserUploadedSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.userVideoSuccessResponse>) {
            state.videoUserUpload = action.payload;
        },
        videoUserUploadedFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.userVideoFailureResponse>) {
            state.videoUserUploadError = action.payload;
        },
        videoModify(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoModifyRequest>) {},
        videoModifySuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoModifySuccessResponse>) {
            state.videoModifySuccess = action.payload;
        },
        videoModifyFailure(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoModule.videoModifyFailureResponse>) {
            state.videoModifyError = action.payload;
        },
    },
});

export const VIDEO: string = videoSlice.name;
export default videoSlice.reducer;
export const videoAction: videoModule.ActionType = videoSlice.actions;
