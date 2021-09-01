import { AxiosResponse } from 'axios';
import client from './client';

type loginFunctionType = ({ userId, password }: authRouter.loginRequest) => Promise<AxiosResponse<authRouter.authSuccessResponse>>;
export const login: loginFunctionType = ({ userId, password }: authRouter.loginRequest) => client.post('/auth/login', {
    userId,
    password,
});

type signupFunctionType = ({ userId, password, email, nickname }: authRouter.singupRequest) => Promise<AxiosResponse<authRouter.authSuccessResponse>>;
export const signup: signupFunctionType = ({ userId, password, email, nickname }: authRouter.singupRequest) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
});

type logoutFunctionType = () => Promise<AxiosResponse<void>>;
export const logout: logoutFunctionType = () => client.get('/auth/logout');

export const check: () => Promise<AxiosResponse<authRouter.checkSuccessResponse>> = () => client.get('/auth/check');
