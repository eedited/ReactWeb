import { AxiosResponse } from 'axios';
import client from './client';

export interface authProp {
    userId: string,
    password: string,
    email?: string
    nickname?: string
}
export interface authSuccessReturnProp{
    success: boolean
}
export interface authFailureReturnProp{
    error: Error
    info: string
}
export type authReturnProp = authSuccessReturnProp | authFailureReturnProp
export type loginFunctionType = ({ userId, password }: authProp)=> Promise<AxiosResponse<authReturnProp>>
export const login: loginFunctionType = ({ userId, password }: authProp) => client.post('/auth/login', {
    userId,
    password,
});

export type signupFunctionType = ({
    userId, password, email, nickname,
}: authProp)=> Promise<AxiosResponse<authReturnProp>>
export const signup: signupFunctionType = ({
    userId, password, email, nickname,
}: authProp) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
});

export type logoutFunctionType = ()=> Promise<AxiosResponse<void>>;
export const logout: logoutFunctionType = () => client.get('/auth/logout');

export type authFunctionType = loginFunctionType|signupFunctionType;
// export const check: ()=> Promise<AxiosResponse<authReturnProp>> = () => client.get('/auth/login/check');
