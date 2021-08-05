import {
    ForkEffect, takeLatest,
} from 'redux-saga/effects';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';
import { videoAction } from './video';
import * as videoAPI from '../../lib/api/video';
import { videoActionType } from './videoType';

const videoSaga: createRequestSagaReturnType<videoAPI.videoAPIProp, videoAPI.videoAPIReturnProp> = createRequestSaga('VIDEO/video', videoAPI.video);
const videoListSaga: createRequestSagaReturnType<videoAPI.videoAPIListProp, videoAPI.videoListAPIReturnProp> = createRequestSaga('VIDEO/videoList', videoAPI.videoList);
const videoUploadSaga: createRequestSagaReturnType<videoAPI.videoAPIUploadProp, videoAPI.videoAPIUploadReturnProp> = createRequestSaga('VIDEO/videoList', videoAPI.videoUpload);

export default function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { video, videoList, videoUpload }: videoActionType = videoAction;
    yield takeLatest(video, videoSaga);
    yield takeLatest(videoList, videoListSaga);
    yield takeLatest(videoUpload, videoUploadSaga);
}
