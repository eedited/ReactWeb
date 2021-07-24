import { AxiosResponse } from 'axios';
import client from './client';

export interface authProp {
    userId: string,
    password: string,
    email?: string
}
export interface authReturnProp{
    success: boolean
}
export type loginFunctionType = ({ userId, password }: authProp)=> Promise<AxiosResponse<authReturnProp>>
export const login: loginFunctionType = ({ userId, password }: authProp) => client.post('/auth/login', {
    userId,
    password,
});
export type registerFunctionType = ({ userId, password, email }: authProp)=> Promise<AxiosResponse<authReturnProp>>
export const register: registerFunctionType = ({ userId, password, email }: authProp) => client.post('/auth/signup', {
    userId,
    password,
    email,
});
export type logoutFunctionType = ()=> Promise<AxiosResponse<void>>;
export const logout: logoutFunctionType = () => client.get('/auth/logout');

export type authFunctionType = loginFunctionType|registerFunctionType;
// export const check: ()=> Promise<AxiosResponse<authReturnProp>> = () => client.get('/auth/login/check');
