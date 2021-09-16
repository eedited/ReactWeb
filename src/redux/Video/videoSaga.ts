import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { CreateRequestSagaReturnType } from '../createRequestSaga';
import { videoAction } from './video';
import * as videoAPI from '../../api/video';

const videoSaga: CreateRequestSagaReturnType<VideoRouter.VideoRequest, VideoRouter.VideoSuccessResponse> = createRequestSaga('VIDEO/video', videoAPI.video);
const videoListSaga: CreateRequestSagaReturnType<VideoRouter.VideoListRequest, VideoRouter.VideoListSuccessResponse> = createRequestSaga('VIDEO/videoList', videoAPI.videoList);
const videoUploadSaga: CreateRequestSagaReturnType<VideoRouter.VideoUploadRequest, VideoRouter.VideoUploadSuccessResponse> = createRequestSaga('VIDEO/videoUpload', videoAPI.videoUpload);
const videoMoreByUserSaga: CreateRequestSagaReturnType<VideoRouter.UserVideoRequest, VideoRouter.UserVideoSuccessResponse> = createRequestSaga('VIDEO/videoUserUploaded', videoAPI.videoUser);
const videoModifySaga: CreateRequestSagaReturnType<VideoRouter.VideoModifyRequest, VideoRouter.VideoModifySuccessResponse> = createRequestSaga('VIDEO/videoModify', videoAPI.videoModify);
export default function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    const {
        video, videoList, videoUpload, videoUserUploaded, videoModify,
    }: RDXVideoModule.ActionType = videoAction;
    yield takeLatest(video, videoSaga);
    yield takeLatest(videoList, videoListSaga);
    yield takeLatest(videoUpload, videoUploadSaga);
    yield takeLatest(videoUserUploaded, videoMoreByUserSaga);
    yield takeLatest(videoModify, videoModifySaga);
}
