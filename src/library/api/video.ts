import { AxiosResponse } from 'axios';
import client from './client';

export interface videoAPIProp{
    videoId: string
}
export interface videoAPIListProp{
    criteria: string
    page: number
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
    nickname: string
}
export interface TAG{
    name: string,
    id: string
}
export interface VideoTag{
    videoTag: TAG[]
}
export interface videoAPISuccessReturnProp{
    video: VIDEO&VideoTag
}
export interface videoAPIFailureReturnProp{
    info: string
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

export interface videoAPIUserProp{
    uploader: string
}
export interface videoAPIUserSuccessProp {
    videos: VIDEO[]
}
export interface videoAPIUserFailureProp {
    info: string
}
export type videoAPIUserReturnProp = videoAPIUserSuccessProp | videoAPIUserFailureProp

export type videoAPIReturnProp = videoAPISuccessReturnProp|videoAPIFailureReturnProp
export type videoAPIFunctionType = ({ videoId }: videoAPIProp)=> Promise<AxiosResponse<videoAPIReturnProp>>;
export const video: videoAPIFunctionType = ({ videoId }: videoAPIProp) => client.get(`/video/${videoId}`);

export type videoListAPIFunctionType = ({ criteria, page }: videoAPIListProp)=> Promise<AxiosResponse<videoListAPIReturnProp>>
export const videoList: videoListAPIFunctionType = ({ criteria, page }: videoAPIListProp) => client.get(`/video/sort/${criteria}/?page=${page}`);

export type videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPIUploadProp)=> Promise<AxiosResponse<videoAPIUploadReturnProp>>
export const videoUpload: videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail,
}: videoAPIUploadProp) => client.post('/video/upload', {
    title,
    discription,
    url,
    thumbnail,
});

export type videoAPIUserFunctionType = ({ uploader }: videoAPIUserProp)=> Promise<AxiosResponse<videoAPIUserReturnProp>>
export const videoUser: videoAPIUserFunctionType = ({ uploader }: videoAPIUserProp) => client.get(`/video/${uploader}/list/?page=1`);

export type getVideoFunctionType = videoListAPIFunctionType|videoAPIFunctionType|videoAPIUploadFunctionType;
