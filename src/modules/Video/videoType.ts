import {
    videoAPIFailureReturnProp, videoAPIListProp, videoAPIProp, videoAPISuccessReturnProp, videoListAPIFailureReturnProp, videoListAPISuccessReturnProp,
} from '../../lib/api/video';
import {
    VIDEO, VIDEO_FAILURE, VIDEO_LIST, VIDEO_LIST_FAILURE, VIDEO_LIST_SUCCESS, VIDEO_SUCCESS,
} from './video';

export type videoSuccessType = videoAPISuccessReturnProp
export type viedoListSuccessType = videoListAPISuccessReturnProp

export type videoFailureType = videoAPIFailureReturnProp
export type videoListFailureType = videoListAPIFailureReturnProp

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
export type videoReducerActionType =
    |videoActionType
    |videoSuccessActionType
    |videoFailureActionType
    |videoListActionType
    |videoListSuccessActionType
    |videoListFailureActionType

export interface videoStateType{
    video: videoSuccessType|null
    videoList: viedoListSuccessType|null
    getVideoError: videoFailureType|null
}
