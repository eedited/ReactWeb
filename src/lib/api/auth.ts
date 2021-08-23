import { AxiosResponse } from 'axios';
import client from './client';

type loginFunctionType = ({ userId, password }: authRouter.loginRequest) => Promise<AxiosResponse<authRouter.authResponse>>;
export const login: loginFunctionType = ({ userId, password }: authRouter.loginRequest) => client.post('/auth/login', {
    userId,
    password,
});

type signupFunctionType = ({ userId, password, email, nickname }: authRouter.singupRequest) => Promise<AxiosResponse<authRouter.authResponse>>;
export const signup: signupFunctionType = ({ userId, password, email, nickname }: authRouter.singupRequest) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
});

type logoutFunctionType = () => Promise<AxiosResponse<void>>;
export const logout: logoutFunctionType = () => client.get('/auth/logout');

export const check: () => Promise<AxiosResponse<authRouter.checkResponse>> = () => client.get('/auth/check');
