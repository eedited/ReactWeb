import { ForkEffect, takeLatest } from 'redux-saga/effects';
import * as videoAPI from '../../lib/api/video';
import createRequestVideoSaga, { createRequestVideoSagaReturnProp } from './videoSaga';
import {
    videoFailureType, videoSuccessType, videoListFailureType, viedoListSuccessType,
    videoActionType, videoSuccessActionType, videoFailureActionType,
    videoListActionType, videoListSuccessActionType, videoListFailureActionType, videoStateType,
    videoReducerActionType,
} from './videoType';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';

export const VIDEO_LIST: 'video/VIDEO_LIST' = 'video/VIDEO_LIST' as const;
export const VIDEO_LIST_SUCCESS: 'video/VIDEO_LIST_SUCCESS' = 'video/VIDEO_LIST_SUCCESS' as const;
export const VIDEO_LIST_FAILURE: 'video/VIDEO_LIST_FAILURE' = 'video/VIDEO_LIST_FAILURE' as const;

export const VIDEO: 'video/VIDEO' = 'video/VIDEO' as const;
export const VIDEO_SUCCESS: 'video/VIDEO_SUCCESS' = 'video/VIDEO_SUCCESS' as const;
export const VIDEO_FAILURE: 'video/VIDEO_FAILURE' = 'video/VIDEO_FAILURE' as const;

export type videoFunctionType = (videoId: string)=> videoActionType
export const video: videoFunctionType = (videoId: string) => ({
    type: VIDEO,
    payload: {
        videoId,
    },
});
export type videoSuccessFunctionType = (payload: videoSuccessType|null)=> videoSuccessActionType
export const videoSuccess: videoSuccessFunctionType = (payload: videoSuccessType|null) => ({
    type: VIDEO_SUCCESS,
    payload,
});
export type videoFailureFunctionType = (payload: videoFailureType|null)=> videoFailureActionType
export const videoFailure: videoFailureFunctionType = (payload: videoFailureType|null) => ({
    type: VIDEO_FAILURE,
    payload,
});

type videListFunctionType = ({ criteria }: videoAPI.videoApiListProp)=> videoListActionType
export const videoList: videListFunctionType = ({ criteria }: videoAPI.videoApiListProp) => ({
    type: VIDEO_LIST,
    payload: {
        criteria,
    },
});
type videoListSuccessFunctionType = (payload: viedoListSuccessType|null)=> videoListSuccessActionType
export const videListSuccess: videoListSuccessFunctionType = (payload: viedoListSuccessType|null) => ({
    type: VIDEO_LIST_SUCCESS,
    payload,
});

type videoListFailureFunctionType = (payload: videoListFailureType|null)=> videoListFailureActionType
export const videoListFailure: videoListFailureFunctionType = (payload: videoListFailureType|null) => ({
    type: VIDEO_LIST_FAILURE,
    payload,
});
const videoSaga: createRequestSagaReturnType<videoAPI.videoApiProp, videoAPI.videoApiReturnProp> = createRequestSaga<videoAPI.videoApiProp, videoAPI.videoApiReturnProp>(VIDEO, videoAPI.video);
const videoListSaga: createRequestSagaReturnType<videoAPI.videoApiListProp, videoAPI.videoListApiReturnProp> = createRequestSaga<videoAPI.videoApiListProp, videoAPI.videoListApiReturnProp>(VIDEO, videoAPI.videoList);
export function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(VIDEO, videoSaga);
    yield takeLatest(VIDEO_LIST, videoListSaga);
}

const initialState: videoStateType = {
    video: null,
    videoList: null,
    getVideoError: null,
};

function videoReducer(state: videoStateType = initialState, action: videoReducerActionType): videoStateType {
    switch (action.type) {
        case VIDEO_SUCCESS:
            return {
                ...state,
                video: action.payload,
            };
        case VIDEO_FAILURE:
            return {
                ...state,
                getVideoError: action.payload,
            };
        case VIDEO_LIST_SUCCESS:
            return {
                ...state,
                videoList: action.payload,
            };
        case VIDEO_LIST_FAILURE:
            return {
                ...state,
                getVideoError: action.payload,
            };
        default:
            return state;
    }
}
export default videoReducer;
