import {
    ForkEffect, takeLatest,
} from 'redux-saga/effects';
import createRequestSaga, { createRequestSagaReturnType } from '../../library/createRequestSaga';
import { videoAction } from './video';
import * as videoAPI from '../../library/api/video';

const videoSaga: createRequestSagaReturnType<videoRouter.videoRequest, videoRouter.videoSuccessResponse> = createRequestSaga('VIDEO/video', videoAPI.video);
const videoListSaga: createRequestSagaReturnType<videoRouter.videoListRequest, videoRouter.videoListSuccessResponse> = createRequestSaga('VIDEO/videoList', videoAPI.videoList);
const videoUploadSaga: createRequestSagaReturnType<videoRouter.videoUploadRequest, videoRouter.videoUploadSuccessResponse> = createRequestSaga('VIDEO/videoUpload', videoAPI.videoUpload);
const videoMoreByUserSaga: createRequestSagaReturnType<videoRouter.userVideoRequest, videoRouter.userVideoSuccessResponse> = createRequestSaga('VIDEO/videoUserUploaded', videoAPI.videoUser);

export default function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    const {
        video, videoList, videoUpload, videoUserUploaded,
    }: videoModule.ActionType = videoAction;
    yield takeLatest(video, videoSaga);
    yield takeLatest(videoList, videoListSaga);
    yield takeLatest(videoUpload, videoUploadSaga);
    yield takeLatest(videoUserUploaded, videoMoreByUserSaga);
}
