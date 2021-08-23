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
}, 'VIDEO'>

const videoSlice: videoSliceType = createSlice({
    name: 'VIDEO',
    initialState,
    reducers: {
        videoClear(state: WritableDraft<videoModule.StateType>) {
            state.videoList = null;
            state.video = null;
            state.getVideoError = null;
            state.videoUploadError = null;
            state.videoUserUpload = null;
            state.videoUserUploadError = null;
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
        videoUploadSuccess(state: WritableDraft<videoModule.StateType>, action: PayloadAction<videoRouter.videoUploadSuccessResponse>) {},
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
    },
});

export const VIDEO: string = videoSlice.name;
export default videoSlice.reducer;
export const videoAction: videoModule.ActionType = videoSlice.actions;
