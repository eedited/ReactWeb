import { AxiosResponse } from 'axios';
import client from './client';

type userAPIFollowFunctionType = ({ userId }: userRouter.userFollowRequest) => Promise<AxiosResponse<userRouter.userFollowResponse>>
export const userFollow: userAPIFollowFunctionType = ({ userId }: userRouter.userFollowRequest) => client.patch(`/user/${userId}/follow`);
