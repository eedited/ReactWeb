import { AxiosResponse } from 'axios';
import client from './client';

type userAPIFollowFunctionType = ({ userId }: userRouter.userFollowRequest) => Promise<AxiosResponse<userRouter.userFollowResponse>>
export const userFollow: userAPIFollowFunctionType = ({ userId }: userRouter.userFollowRequest) => client.patch(`/user/${userId}/follow`);
type myPageFunctionType = ({ userId }: userRouter.myPageRequest) => Promise<AxiosResponse<userRouter.myPageSuccessResponse>>;
export const myPage: myPageFunctionType = ({ userId }: userRouter.myPageRequest) => client.get(`/user/${userId}`);
