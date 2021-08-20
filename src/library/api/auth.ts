import { AxiosResponse } from 'axios';
import client from './client';

export interface signupProp {
    [key: string]: string
    userId: string,
    password: string,
    email: string
    nickname: string
}
export interface loginProp{
    [key: string]: string
    userId: string,
    password: string
}
export interface checkSuccessReturnProp{
    userId: string,
    nickname: string,
    email: string,
    profilePicture: string,
    proTag: boolean
}
export interface checkFailureReturnProp{
    info: string
}
export type checkReturnProp = checkSuccessReturnProp | checkFailureReturnProp
export interface authSuccessReturnProp{
    success: boolean
}
export interface authFailureReturnProp{
    success: boolean
    info: string
}
export type authReturnProp = authSuccessReturnProp | authFailureReturnProp
export type loginFunctionType = ({ userId, password }: loginProp)=> Promise<AxiosResponse<authReturnProp>>
export const login: loginFunctionType = ({ userId, password }: loginProp) => client.post('/auth/login', {
    userId,
    password,
});

export type signupFunctionType = ({
    userId, password, email, nickname,
}: signupProp)=> Promise<AxiosResponse<authReturnProp>>
export const signup: signupFunctionType = ({
    userId, password, email, nickname,
}: signupProp) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
});

export type logoutFunctionType = ()=> Promise<AxiosResponse<void>>;
export const logout: logoutFunctionType = () => client.get('/auth/logout');

export const check: ()=> Promise<AxiosResponse<checkReturnProp>> = () => client.get('/auth/check');
