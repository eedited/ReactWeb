import { AxiosResponse } from 'axios';
import client from './client';

type UserAPIFollowFunctionType = ({
    userId,
}: UserRouter.UserFollowRequest) => Promise<AxiosResponse<UserRouter.UserFollowResponse>>;
export const userFollow: UserAPIFollowFunctionType = ({
    userId,
}: UserRouter.UserFollowRequest) => client.patch(`/user/${userId}/follow`);

type MyPageFunctionType = ({
    userId,
}: UserRouter.MyPageRequest) => Promise<AxiosResponse<UserRouter.MyPageSuccessResponse>>;
export const myPage: MyPageFunctionType = ({
    userId,
}: UserRouter.MyPageRequest) => client.get(`/user/${userId}`);

type MyPageModifyFunctionType = ({ description, nickname }: UserRouter.MypageModifyRequest) => Promise<AxiosResponse<UserRouter.MypageModifySuccessResponse>>;
export const myPageModify: MyPageModifyFunctionType = ({
    description, nickname, profilePicture,
}: UserRouter.MypageModifyRequest) => client.patch('/user/change', {
    description, nickname, profilePicture,
});

type DiscomfortFunctionType = ({ description, title }: UserRouter.DiscomfortRequest) => Promise<AxiosResponse<UserRouter.DiscomfortSuccessResponse>>;
export const discomfort: DiscomfortFunctionType = ({
    description, title,
}: UserRouter.DiscomfortRequest) => client.post('/user/discomfort', {
    title,
    description,
});

type SetSNSFunctionType = ({ facebook, instagram, linkedin, twitter }: UserRouter.SetSnsRequest) => Promise<AxiosResponse<UserRouter.SetSnsSuccessResponse>>
export const setSns: SetSNSFunctionType = ({
    facebook, instagram, linkedin, twitter,
}: UserRouter.SetSnsRequest) => client.patch('/user/change/sns', {
    facebook,
    instagram,
    linkedin,
    twitter,
});

type UserExistFunctionType = ({
    userId,
}: UserRouter.UserExistRequest) => Promise<AxiosResponse<UserRouter.UserExistSuccessResponse>>;
export const UserExist: UserExistFunctionType = ({
    userId,
}: UserRouter.UserExistRequest) => client.post('/user/exist', { userId });
