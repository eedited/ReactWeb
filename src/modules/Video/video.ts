import { ForkEffect, takeLatest } from 'redux-saga/effects';
import * as videoAPI from '../../lib/api/video';
import {
    videoFailureType, videoSuccessType, videoListFailureType, viedoListSuccessType,
    videoActionType, videoSuccessActionType, videoFailureActionType,
    videoListActionType, videoListSuccessActionType, videoListFailureActionType, videoStateType,
    videoReducerActionType,
    videoUploadActionType,
    videoUploadSuccessActionType,
    videoUploadFailureActionType,
    videoUploadSuccessType,
    videoUploadFailureType,
    videoClearActionType,
} from './videoType';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';

export const VIDEO_LIST: 'video/VIDEO_LIST' = 'video/VIDEO_LIST' as const;
export const VIDEO_LIST_SUCCESS: 'video/VIDEO_LIST_SUCCESS' = 'video/VIDEO_LIST_SUCCESS' as const;
export const VIDEO_LIST_FAILURE: 'video/VIDEO_LIST_FAILURE' = 'video/VIDEO_LIST_FAILURE' as const;

export const VIDEO: 'video/VIDEO' = 'video/VIDEO' as const;
export const VIDEO_SUCCESS: 'video/VIDEO_SUCCESS' = 'video/VIDEO_SUCCESS' as const;
export const VIDEO_FAILURE: 'video/VIDEO_FAILURE' = 'video/VIDEO_FAILURE' as const;

export const VIDEO_UPLOAD: 'video/VIDEO_UPLOAD' = 'video/VIDEO_UPLOAD' as const;
export const VIDEO_UPLOAD_SUCCESS: 'video/VIDEO_UPLOAD_SUCCESS' = 'video/VIDEO_UPLOAD_SUCCESS' as const;
export const VIDEO_UPLOAD_FAILURE: 'video/VIDEO_UPLOAD_FAILURE' = 'video/VIDEO_UPLOAD_FAILURE' as const;

export const VIDEO_USER: 'video/VIDEO_USER' = 'video/VIDEO_USER' as const;
export const VIDEO_USER_SUCCESS: 'video/VIDEO_USER_SUCCESS' = 'video/VIDEO_USER_SUCCESS' as const;
export const VIDEO_USER_FAILURE: 'video/VIDEO_USER_FAILURE' = 'video/VIDEO_USER_FAILURE' as const;

export const VIDEO_USER_LIKE: 'video/VIDEO_USER_LIKE' = 'video/VIDEO_USER_LIKE' as const;
export const VIDEO_USER_LIKE_SUCCESS: 'video/VIDEO_USER_LIKE_SUCCESS' = 'video/VIDEO_USER_LIKE_SUCCESS' as const;
export const VIDEO_USER_LIKE_FAILURE: 'video/VIDEO_USER_LIKE_FAILURE' = 'video/VIDEO_USER_LIKE_FAILURE' as const;

export const VIDEO_CLEAR: 'video/VIDEO_CLEAR' = 'video/VIDEO_CLEAR' as const;

export type videoClearFunctionType = ()=> videoClearActionType
export const videoClear: videoClearFunctionType = () => ({
    type: VIDEO_CLEAR,
});

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

type videListFunctionType = ({ criteria }: videoAPI.videoAPIListProp)=> videoListActionType
export const videoList: videListFunctionType = ({ criteria, page }: videoAPI.videoAPIListProp) => ({
    type: VIDEO_LIST,
    payload: {
        criteria,
        page,
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

type videoUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPI.videoAPIUploadProp)=> videoUploadActionType
export const videoUpload: videoUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPI.videoAPIUploadProp) => ({
    type: VIDEO_UPLOAD,
    payload: {
        title,
        discription,
        url,
        thumbnail,
    },
});
type videoUploadSuccessFunctionType = (payload: videoUploadSuccessType|null)=> videoUploadSuccessActionType
export const videoUploadSuccess: videoUploadSuccessFunctionType = (payload: videoUploadSuccessType|null) => ({
    type: VIDEO_UPLOAD_SUCCESS,
    payload,
});
type videoUploadFailureFunctionType = (payload: videoUploadFailureType|null)=> videoUploadFailureActionType
export const videoUploadFailure: videoUploadFailureFunctionType = (payload: videoUploadFailureType|null) => ({
    type: VIDEO_UPLOAD_FAILURE,
    payload,
});

const videoSaga: createRequestSagaReturnType<videoAPI.videoAPIProp, videoAPI.videoAPIReturnProp> = createRequestSaga<videoAPI.videoAPIProp, videoAPI.videoAPIReturnProp>(VIDEO, videoAPI.video);
const videoListSaga: createRequestSagaReturnType<videoAPI.videoAPIListProp, videoAPI.videoListAPIReturnProp> = createRequestSaga<videoAPI.videoAPIListProp, videoAPI.videoListAPIReturnProp>(VIDEO_LIST, videoAPI.videoList);
const videoUploadSaga: createRequestSagaReturnType<videoAPI.videoAPIUploadProp, videoAPI.videoAPIUploadReturnProp> = createRequestSaga<videoAPI.videoAPIUploadProp, videoAPI.videoAPIUploadReturnProp>(VIDEO_UPLOAD, videoAPI.videoUpload);
export function* getVideoSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(VIDEO, videoSaga);
    yield takeLatest(VIDEO_LIST, videoListSaga);
    yield takeLatest(VIDEO_UPLOAD, videoUploadSaga);
}

const initialState: videoStateType = {
    video: null,
    videoList: null,
    getVideoError: null,
    videoUploadError: null,
};

function videoReducer(state: videoStateType = initialState, action: videoReducerActionType): videoStateType {
    switch (action.type) {
        case VIDEO_CLEAR:
            return initialState;
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
        case VIDEO_LIST_SUCCESS: // 비디오를 성공적으로 얻어왔을 때이므로, action.payload는 null일수가 없다.
            if (state.videoList) {
                if (action.payload) {
                    return {
                        ...state,
                        videoList: { videos: state.videoList.videos.concat(action.payload.videos) },
                    };
                }
            }
            else if (action.payload) {
                return {
                    ...state,
                    videoList: action.payload,
                };
            }
            return state;
        case VIDEO_LIST_FAILURE:
            return {
                ...state,
                getVideoError: action.payload,
            };
        case VIDEO_UPLOAD_SUCCESS:
            return {
                ...state,
            };
        case VIDEO_UPLOAD_FAILURE:
            return {
                ...state,
                videoUploadError: action.payload,
            };
        default:
            return state;
    }
}
export default videoReducer;
