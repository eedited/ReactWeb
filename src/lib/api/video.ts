import { AxiosResponse } from 'axios';
import client from './client';

export interface videoApiProp{
    videoId: string
}
export interface videoApiListProp{
    criteria: string
}
export interface videoApiReturnSuccessProp{
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
export interface videoApiReturnFailureProp{
    error: Error
}
export type videoApiReturnProp = videoApiReturnSuccessProp|videoApiReturnFailureProp
export type videoApiFunctionType = ({ videoId }: videoApiProp)=> Promise<AxiosResponse<videoApiReturnProp>>;
export const video: videoApiFunctionType = ({ videoId }: videoApiProp) => client.get(`/video/${videoId}`);

export type videoListApiReturnSuccessProp = videoApiReturnProp[]
export type videoListApiReturnFailureProp = videoApiReturnFailureProp
export type videoListApiReturnProp = videoListApiReturnSuccessProp|videoListApiReturnFailureProp
export type videoListApiFunctionType = ({ criteria }: videoApiListProp)=> Promise<AxiosResponse<videoListApiReturnProp>>
export const videoList: videoListApiFunctionType = ({ criteria }: videoApiListProp) => client.get('/video/{criteria}');
export const videoListLatest: videoListApiFunctionType = () => client.get('/video/sort/latest');
export const videoListThumbUp: videoListApiFunctionType = () => client.get('/video/sort/thumbup');

export type getVideoFunctionType = videoListApiFunctionType|videoApiFunctionType;
