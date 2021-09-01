import { AxiosResponse } from 'axios';
import client from './client';

type myPageFunctionType = ({ userId }: userRouter.myPageRequest) => Promise<AxiosResponse<userRouter.myPageSuccessResponse>>;
export const myPage: myPageFunctionType = ({ userId }: userRouter.myPageRequest) => client.get(`/user/${userId}`);
