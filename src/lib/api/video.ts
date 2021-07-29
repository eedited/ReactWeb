import { AxiosResponse } from 'axios';
import client from './client';

export interface videoProp{
    videoId: string
}
export interface videoReturnProp{
    videoUrl: string,
    thumnailUrl: string,
    videoID: string
}
export type videoApiFunctionType = ({ videoId }: videoProp)=> Promise<AxiosResponse<videoReturnProp>>;
export const video: videoApiFunctionType = ({ videoId }: videoProp) => client.get(`/video/${videoId}`);

export type videoListApiReturnProp = videoReturnProp[]
export type videoListApiFunctionType = ()=> Promise<AxiosResponse<videoListApiReturnProp>>
export const videoList: videoListApiFunctionType = () => client.get('/video');

export type getVideoFunctionType = videoListApiFunctionType|videoApiFunctionType;
