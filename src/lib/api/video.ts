import { AxiosResponse } from 'axios';
import client from './client';

export interface videoAPIProp{
    videoId: string
}
export interface videoAPIListProp{
    criteria: string
}
export interface VIDEO {
    id: string
    uploader: string
    title: string
    discription: string
    url: string
    thumbnail: string
    likeCnt: number
    viewCnt: number
    createdAt: Date
    updatedAt: Date
    deleted: Date | null
}
export interface videoAPISuccessReturnProp{
    video: VIDEO
}
export interface videoAPIFailureReturnProp{
    info: string
    error: Error
}

export interface videoListAPISuccessReturnProp {
    videos: VIDEO[]
}
export type videoListAPIFailureReturnProp = videoAPIFailureReturnProp
export type videoListAPIReturnProp = videoListAPISuccessReturnProp|videoListAPIFailureReturnProp

export interface videoAPIUploadProp{
    title: string,
    discription: string,
    url: string,
    thumbnail: string
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface videoAPIUploadSuccessReturnProp {}
export interface videoAPIUploadFailureReturnProp {
    info: string
}
export type videoAPIUploadReturnProp = videoAPIUploadSuccessReturnProp|videoAPIUploadFailureReturnProp

export type videoAPIReturnProp = videoAPISuccessReturnProp|videoAPIFailureReturnProp
export type videoAPIFunctionType = ({ videoId }: videoAPIProp)=> Promise<AxiosResponse<videoAPIReturnProp>>;
export const video: videoAPIFunctionType = ({ videoId }: videoAPIProp) => client.get(`/video/largeVideo/${videoId}`);

export type videoListAPIFunctionType = ({ criteria }: videoAPIListProp)=> Promise<AxiosResponse<videoListAPIReturnProp>>
export const videoList: videoListAPIFunctionType = ({ criteria }: videoAPIListProp) => client.get(`/video/sort/${criteria}`);

export type videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPIUploadProp)=> Promise<AxiosResponse<videoAPIUploadReturnProp>>
export const videoUpload: videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPIUploadProp) => client.get('/video/upload');

export type getVideoFunctionType = videoListAPIFunctionType|videoAPIFunctionType|videoAPIUploadFunctionType;
