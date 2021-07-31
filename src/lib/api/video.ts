import { AxiosResponse } from 'axios';
import client from './client';

export interface videoAPIProp{
    videoId: string
}
export interface videoAPIListProp{
    criteria: string
}
export interface videoAPISuccessReturnProp{
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
export interface videoAPIFailureReturnProp{
    error: Error
}
export type videoAPIReturnProp = videoAPISuccessReturnProp|videoAPIFailureReturnProp
export type videoAPIFunctionType = ({ videoId }: videoAPIProp)=> Promise<AxiosResponse<videoAPIReturnProp>>;
export const video: videoAPIFunctionType = ({ videoId }: videoAPIProp) => client.get(`/video/${videoId}`);

export type videoListAPISuccessReturnProp = videoAPIReturnProp[]
export type videoListAPIFailureReturnProp = videoAPIFailureReturnProp
export type videoListAPIReturnProp = videoListAPISuccessReturnProp|videoListAPIFailureReturnProp
export type videoListAPIFunctionType = ({ criteria }: videoAPIListProp)=> Promise<AxiosResponse<videoListAPIReturnProp>>
export const videoList: videoListAPIFunctionType = ({ criteria }: videoAPIListProp) => client.get('/video/{criteria}');
export const videoListLatest: videoListAPIFunctionType = () => client.get('/video/sort/latest');
export const videoListThumbUp: videoListAPIFunctionType = () => client.get('/video/sort/thumbup');

export type getVideoFunctionType = videoListAPIFunctionType|videoAPIFunctionType;
