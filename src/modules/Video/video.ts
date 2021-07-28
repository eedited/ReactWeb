import { ForkEffect, takeLatest } from 'redux-saga/effects';
import * as videoAPI from '../../lib/api/video';
import createRequestSaga, { createRequestActionTypes, createVideoRequestSaga, createVideoRequestSagaReturnType } from '../../lib/createRequestSaga';

export const [VIDEO_LIST, VIDEO_LIST_SUCCESS, VIDEO_LIST_FAILURE]: string[] = createRequestActionTypes('video/VIDEO_LIST');
export const [VIDEO, VIDEO_SUCCESS, VIDEO_FAILURE]: string[] = createRequestActionTypes('video/VIDEO');

export interface videoSuccessType{
    videoURL: string,
    thumnailURL: string,
    videoID: string
}
export type viedoListSuccessType = videoSuccessType[]

export interface videoFailureType{
    info: string
}
export interface videoListFailureType{
    info: string
}

export interface videoActionType {
    type: string,
    payload: videoAPI.videoProp
}
type videoActionFunctionType = (videoId: string)=> videoActionType
export const video: videoActionFunctionType = (videoId: string) => ({
    type: VIDEO,
    payload: {
        videoId,
    },
});
export interface videoSuccessActionType{
    type: string,
    payload: videoSuccessType|null
}
type videoSuccessActionFunctionType = (payload: videoSuccessType|null)=> videoSuccessActionType
export const videoSuccess: videoSuccessActionFunctionType = (payload: videoSuccessType|null) => ({
    type: VIDEO_SUCCESS,
    payload,
});
export interface videoFailureActionType{
    type: string,
    payload: videoFailureType|null
}
type videoFailureActionFunctionType = (payload: videoFailureType|null)=> videoFailureActionType
export const videoFailure: videoFailureActionFunctionType = (payload: videoFailureType|null) => ({
    type: VIDEO_FAILURE,
    payload,
});

const videoSaga: createVideoRequestSagaReturnType = createVideoRequestSaga(VIDEO, videoAPI.video);
export function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(VIDEO, videoSaga);
}
export interface videoStateType{
    video: videoSuccessType|null
    videoList: videoSuccessType[]|null
    getVideoError: videoFailureType|null
}
const initialState: videoStateType = {
    video: null,
    videoList: null,
    getVideoError: null,
};
type videoRedcerActionType =
    |videoActionType
    |videoSuccessActionType
    |videoFailureActionType
function videoReducer(state: videoStateType = initialState, action: videoRedcerActionType): videoStateType {
    switch (action.type) {
        case VIDEO_SUCCESS:
            return {
                ...state,
                video: (action as videoSuccessActionType).payload,
            };
        case VIDEO_FAILURE:
            return {
                ...state,
                getVideoError: (action as videoFailureActionType).payload,
            };
        default:
            return state;
    }
}
export default videoReducer;
