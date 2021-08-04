import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import {
    VIDEO,
    videoAPIFailureReturnProp, videoAPIListProp, videoAPIProp, videoAPISuccessReturnProp, videoAPIUploadFailureReturnProp, videoAPIUploadProp, videoAPIUploadSuccessReturnProp, videoListAPIFailureReturnProp, videoListAPISuccessReturnProp,
} from '../../lib/api/video';

export type videoSuccessType = videoAPISuccessReturnProp
export type viedoListSuccessType = videoListAPISuccessReturnProp
export type videoUploadSuccessType = videoAPIUploadSuccessReturnProp

export interface videoFailureType extends videoAPIFailureReturnProp{
    error: Error
}
export interface videoListFailureType extends videoListAPIFailureReturnProp{
    error: Error
}
export interface videoUploadFailureType extends videoAPIUploadFailureReturnProp{
    error: Error
}

export type videoActionType=CaseReducerActions<{
    videoClear(state: WritableDraft<videoStateType>): void;
    video(state: WritableDraft<videoStateType>, action: PayloadAction<videoAPIProp>): void;
    videoSuccess(state: WritableDraft<videoStateType>, action: PayloadAction<videoSuccessType>): void;
    videoFailure(state: WritableDraft<videoStateType>, action: PayloadAction<videoFailureType>): void;
    videoList(state: WritableDraft<videoStateType>, action: PayloadAction<videoAPIListProp>): void;
    videoListSuccess(state: WritableDraft<videoStateType>, action: PayloadAction<viedoListSuccessType>): void;
    videoListFailure(state: WritableDraft<videoStateType>, action: PayloadAction<videoListFailureType>): void;
    videoUpload(state: WritableDraft<videoStateType>, action: PayloadAction<videoAPIUploadProp>): void;
    videoUploadSuccess(state: WritableDraft<videoStateType>, action: PayloadAction<videoUploadSuccessType>): void;
    videoUploadFailure(state: WritableDraft<videoStateType>, action: PayloadAction<videoUploadFailureType>): void;
}>
export interface videoStateType{
    video: VIDEO|null
    videoList: viedoListSuccessType|null
    getVideoError: videoFailureType|null
    videoUploadError: videoUploadFailureType|null
}
