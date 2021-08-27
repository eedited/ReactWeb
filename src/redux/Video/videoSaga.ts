import {
    ForkEffect, takeLatest,
} from 'redux-saga/effects';
import createRequestSaga, { createRequestSagaReturnType } from '../../library/createRequestSaga';
import { videoAction } from './video';
import * as videoAPI from '../../library/api/video';

const videoSaga: createRequestSagaReturnType<videoRouter.videoRequest, videoRouter.videoResponse> = createRequestSaga('VIDEO/video', videoAPI.video);
const videoListSaga: createRequestSagaReturnType<videoRouter.videoListRequest, videoRouter.videoListResponse> = createRequestSaga('VIDEO/videoList', videoAPI.videoList);
const videoUploadSaga: createRequestSagaReturnType<videoRouter.videoUploadRequest, videoRouter.videoUploadResponse> = createRequestSaga('VIDEO/videoList', videoAPI.videoUpload);
const videoMoreByUserSaga: createRequestSagaReturnType<videoRouter.userVideoRequest, videoRouter.userVideoResponse> = createRequestSaga('VIDEO/videoUserUploaded', videoAPI.videoUser);

export default function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    const {
        video, videoList, videoUpload, videoUserUploaded,
    }: videoModule.ActionType = videoAction;
    yield takeLatest(video, videoSaga);
    yield takeLatest(videoList, videoListSaga);
    yield takeLatest(videoUpload, videoUploadSaga);
    yield takeLatest(videoUserUploaded, videoMoreByUserSaga);
}
