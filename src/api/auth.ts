import { AxiosResponse } from 'axios';
import client from './client';

type LoginFunctionType = ({ userId, password }: AuthRouter.LoginRequest) => Promise<AxiosResponse<AuthRouter.AuthSuccessResponse>>;
export const login: LoginFunctionType = ({ userId, password }: AuthRouter.LoginRequest) => client.post('/auth/login', {
    userId,
    password,
});

type SignupFunctionType = ({ userId, password, email, nickname }: AuthRouter.SignupRequest) => Promise<AxiosResponse<AuthRouter.AuthSuccessResponse>>;
export const signup: SignupFunctionType = ({ userId, password, email, nickname }: AuthRouter.SignupRequest) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
});

type LogoutFunctionType = () => Promise<AxiosResponse<void>>;
export const logout: LogoutFunctionType = () => client.get('/auth/logout');

export const check: () => Promise<AxiosResponse<AuthRouter.CheckSuccessResponse>> = () => client.get('/auth/check');
