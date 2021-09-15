import { AxiosResponse } from 'axios';
import client from './client';

type videoAPIFunctionType = ({ videoId }: videoRouter.videoRequest) => Promise<AxiosResponse<videoRouter.videoSuccessResponse>>;
export const video: videoAPIFunctionType = ({ videoId }: videoRouter.videoRequest) => client.get(`/video/${videoId}`);

type videoListAPIFunctionType = ({ category, platform, program, sorting, page }: videoRouter.videoListRequest) => Promise<AxiosResponse<videoRouter.videoListSuccessResponse>>
export const videoList: videoListAPIFunctionType = ({ category, platform, program, sorting, page }: videoRouter.videoListRequest) => client.get(`/video/sort/${sorting}/?page=${page}`);

type videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail, tags,
}: videoRouter.videoUploadRequest) => Promise<AxiosResponse<videoRouter.videoUploadSuccessResponse>>
export const videoUpload: videoAPIUploadFunctionType = ({
    title, discription, url, thumbnail, tags,
}: videoRouter.videoUploadRequest) => client.post('/video/upload', {
    title, discription, url, thumbnail, tags,
});

type videoAPIModifyFunctionType = ({
    id, title, discription, url, thumbnail, tags,
}: videoRouter.videoModifyRequest) => Promise<AxiosResponse<videoRouter.videoModifySuccessResponse>>
export const videoModify: videoAPIModifyFunctionType = ({
    id, title, discription, url, thumbnail, tags,
}: videoRouter.videoModifyRequest) => client.patch('/video/upload', {
    id, title, discription, url, thumbnail, tags,
});

type videoAPIUserFunctionType = ({ uploader }: videoRouter.userVideoRequest) => Promise<AxiosResponse<videoRouter.userVideoSuccessResponse>>
export const videoUser: videoAPIUserFunctionType = ({ uploader }: videoRouter.userVideoRequest) => client.get(`/video/${uploader}/list/?page=1`);

type videoAPILikeFunctionType = ({ videoId }: videoRouter.videoLikeRequest) => Promise<AxiosResponse<videoRouter.videoLikeSuccessResponse>>
export const videoLike: videoAPILikeFunctionType = ({ videoId }: videoRouter.videoLikeRequest) => client.patch(`/video/${videoId}/like`);
