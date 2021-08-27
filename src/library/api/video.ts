import { AxiosResponse } from 'axios';
import client from './client';

type videoAPIFunctionType = ({ videoId }: videoRouter.videoRequest) => Promise<AxiosResponse<videoRouter.videoResponse>>;
export const video: videoAPIFunctionType = ({ videoId }: videoRouter.videoRequest) => client.get(`/video/${videoId}`);

type videoListAPIFunctionType = ({ criteria, page }: videoRouter.videoListRequest) => Promise<AxiosResponse<videoRouter.videoListResponse>>
export const videoList: videoListAPIFunctionType = ({ criteria, page }: videoRouter.videoListRequest) => client.get(`/video/sort/${criteria}/?page=${page}`);

type videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail, tags,
}: videoRouter.videoUploadRequest) => Promise<AxiosResponse<videoRouter.videoUploadResponse>>
export const videoUpload: videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail, tags,
}: videoRouter.videoUploadRequest) => client.post('/video/upload', {
    title, discription, url, thumbnail, tags,
});

type videoAPIUserFunctionType = ({ uploader }: videoRouter.userVideoRequest) => Promise<AxiosResponse<videoRouter.userVideoResponse>>
export const videoUser: videoAPIUserFunctionType = ({ uploader }: videoRouter.userVideoRequest) => client.get(`/video/${uploader}/list/?page=1`);
