import { AxiosResponse } from 'axios';
import client from './client';

export interface videoProp{
    videoId: string
}
export interface videoReturnProp{
    videoURL: string,
    thumnailURL: string,
    videoID: string
}
export type videoFunctionType = ({ videoId }: videoProp)=> Promise<AxiosResponse<videoReturnProp>>;
export const video: videoFunctionType = ({ videoId }: videoProp) => client.get(`/video/${videoId}`);

export type videoListReturnProp = videoReturnProp[]
export type videoListFunctionType = ()=> Promise<AxiosResponse<videoListReturnProp>>
export const videoList: videoListFunctionType = () => client.get('/video');

export type getVideoFunctionType = videoListFunctionType|videoFunctionType;
