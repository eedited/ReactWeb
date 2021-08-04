import {
    videoAPIFailureReturnProp, videoAPIListProp, videoAPIProp, videoAPISuccessReturnProp, videoAPIUploadFailureReturnProp, videoAPIUploadProp, videoAPIUploadSuccessReturnProp, videoListAPIFailureReturnProp, videoListAPISuccessReturnProp,
} from '../../lib/api/video';
import {
    VIDEO, VIDEO_CLEAR, VIDEO_FAILURE, VIDEO_LIST, VIDEO_LIST_FAILURE, VIDEO_LIST_SUCCESS, VIDEO_SUCCESS, VIDEO_UPLOAD, VIDEO_UPLOAD_FAILURE, VIDEO_UPLOAD_SUCCESS,
} from './video';

export type videoSuccessType = videoAPISuccessReturnProp
export type viedoListSuccessType = videoListAPISuccessReturnProp
export type videoUploadSuccessType = videoAPIUploadSuccessReturnProp

export type videoFailureType = videoAPIFailureReturnProp & Error
export type videoListFailureType = videoListAPIFailureReturnProp & Error
export type videoUploadFailureType = videoAPIUploadFailureReturnProp&Error

export interface videoActionType{
    type: typeof VIDEO
    payload: videoAPIProp
}
export interface videoSuccessActionType{
    type: typeof VIDEO_SUCCESS
    payload: videoSuccessType|null
}
export interface videoFailureActionType{
    type: typeof VIDEO_FAILURE
    payload: videoFailureType|null
}

export interface videoListActionType{
    type: typeof VIDEO_LIST
    payload: videoAPIListProp
}
export interface videoListSuccessActionType{
    type: typeof VIDEO_LIST_SUCCESS
    payload: viedoListSuccessType|null
}
export interface videoListFailureActionType{
    type: typeof VIDEO_LIST_FAILURE
    payload: videoListFailureType|null
}

export interface videoUploadActionType{
    type: typeof VIDEO_UPLOAD
    payload: videoAPIUploadProp
}
export interface videoUploadSuccessActionType{
    type: typeof VIDEO_UPLOAD_SUCCESS
    payload: videoUploadSuccessType|null
}
export interface videoUploadFailureActionType{
    type: typeof VIDEO_UPLOAD_FAILURE
    payload: videoUploadFailureType|null
}
export interface videoClearActionType{
    type: typeof VIDEO_CLEAR
}

export type videoReducerActionType =
    |videoActionType
    |videoSuccessActionType
    |videoFailureActionType
    |videoListActionType
    |videoListSuccessActionType
    |videoListFailureActionType
    |videoUploadActionType
    |videoUploadSuccessActionType
    |videoUploadFailureActionType
    |videoClearActionType

export interface videoStateType{
    video: videoSuccessType|null
    videoList: viedoListSuccessType|null
    getVideoError: videoFailureType|null
    videoUploadError: videoUploadFailureType|null
}
