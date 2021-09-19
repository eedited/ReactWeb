/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: RDXVideoModule.StateType = {
    video: null,
    videoList: null,
    getVideoError: null,
    videoUploadError: null,
    videoUserUpload: null,
    videoUserUploadError: null,
    videoUploadSuccess: null,
    videoModifySuccess: null,
    videoModifyError: null,
    endVideoList: false,
};
type VideoSliceType = Slice<RDXVideoModule.StateType, {
    videoClear(state: WritableDraft<RDXVideoModule.StateType>): void;
    video(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoRequest>): void;
    videoSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoSuccessResponse>): void;
    videoFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoFailureResponse>): void;
    videoList(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoListRequest>): void;
    videoListSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoListSuccessResponse>): void;
    videoListFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoListFailureResponse>): void;
    videoUpload(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoUploadRequest>): void;
    videoUploadSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoUploadSuccessResponse>): void;
    videoUploadFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoUploadFailureResponse>): void;
    videoUserUploaded(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.UserVideoRequest>): void;
    videoUserUploadedSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.UserVideoSuccessResponse>): void
    videoUserUploadedFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.UserVideoFailureResponse>): void
    videoModify(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoModifyRequest>): void;
    videoModifySuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoModifySuccessResponse>): void;
    videoModifyFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoModifyFailureResponse>): void;
}, 'VIDEO'>

const videoSlice: VideoSliceType = createSlice({
    name: 'VIDEO',
    initialState,
    reducers: {
        videoClear(state: WritableDraft<RDXVideoModule.StateType>) {
            state.videoList = null;
            state.video = null;
            state.videoUploadSuccess = null;
            state.getVideoError = null;
            state.videoUploadError = null;
            state.videoUserUpload = null;
            state.videoUserUploadError = null;
            state.videoModifyError = null;
            state.videoModifySuccess = null;
            state.endVideoList = false;
        },

        video(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoRequest>) {},
        videoSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoSuccessResponse>) {
            state.video = action.payload;
        },
        videoFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoFailureResponse>) {
            state.getVideoError = action.payload;
        },

        videoList(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoListRequest>) {},
        videoListSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoListSuccessResponse>) {
            if (state.videoList == null) {
                state.videoList = { videos: action.payload.videos };
            }
            else {
                state.videoList.videos = state.videoList.videos.concat(action.payload.videos);
                if (action.payload.videos.length < 20) {
                    state.endVideoList = true;
                }
            }
        },
        videoListFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoFailureResponse>) {
            state.getVideoError = action.payload;
        },

        videoUpload(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoUploadRequest>) {},
        videoUploadSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoUploadSuccessResponse>) {
            state.videoUploadSuccess = action.payload;
        },
        videoUploadFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoUploadFailureResponse>) {
            state.videoUploadError = action.payload;
        },

        videoUserUploaded(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.UserVideoRequest>) {},
        videoUserUploadedSuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.UserVideoSuccessResponse>) {
            state.videoUserUpload = action.payload;
        },
        videoUserUploadedFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.UserVideoFailureResponse>) {
            state.videoUserUploadError = action.payload;
        },
        videoModify(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoModifyRequest>) {},
        videoModifySuccess(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<VideoRouter.VideoModifySuccessResponse>) {
            state.videoModifySuccess = action.payload;
        },
        videoModifyFailure(state: WritableDraft<RDXVideoModule.StateType>, action: PayloadAction<RDXVideoModule.VideoModifyFailureResponse>) {
            state.videoModifyError = action.payload;
        },
    },
});

export const VIDEO: string = videoSlice.name;
export default videoSlice.reducer;
export const videoAction: RDXVideoModule.ActionType = videoSlice.actions;
