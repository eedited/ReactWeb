import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { CreateRequestSagaReturnType } from '../createRequestSaga';
import * as videoAPI from '../../api/video';
import { videoAction } from './video';

const videoSaga: CreateRequestSagaReturnType<VideoRouter.VideoRequest, VideoRouter.VideoSuccessResponse> = createRequestSaga('VIDEO/video', videoAPI.video);
const videoListSaga: CreateRequestSagaReturnType<VideoRouter.VideoListRequest, VideoRouter.VideoListSuccessResponse> = createRequestSaga('VIDEO/videoList', videoAPI.videoList);
const videoUploadSaga: CreateRequestSagaReturnType<VideoRouter.VideoUploadRequest, VideoRouter.VideoUploadSuccessResponse> = createRequestSaga('VIDEO/videoUpload', videoAPI.videoUpload);
const videoMoreByUserSaga: CreateRequestSagaReturnType<VideoRouter.UserVideoRequest, VideoRouter.UserVideoSuccessResponse> = createRequestSaga('VIDEO/videoUserUploaded', videoAPI.videoUser);
const videoModifySaga: CreateRequestSagaReturnType<VideoRouter.VideoModifyRequest, VideoRouter.VideoModifySuccessResponse> = createRequestSaga('VIDEO/videoModify', videoAPI.videoModify);
const videoUserMayBeLikeSaga: CreateRequestSagaReturnType<VideoRouter.VideoListRequest, VideoRouter.VideoListSuccessResponse> = createRequestSaga('VIDEO/videoUserMayBeLike', videoAPI.videoList);
export default function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    const {
        video, videoList, videoUpload, videoUserUploaded, videoModify, videoUserMayBeLike,
    }: RDXVideoModule.ActionType = videoAction;
    yield takeLatest(video, videoSaga);
    yield takeLatest(videoList, videoListSaga);
    yield takeLatest(videoUpload, videoUploadSaga);
    yield takeLatest(videoUserUploaded, videoMoreByUserSaga);
    yield takeLatest(videoModify, videoModifySaga);
    yield takeLatest(videoUserMayBeLike, videoUserMayBeLikeSaga);
}
