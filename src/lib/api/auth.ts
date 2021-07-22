import { AxiosResponse } from 'axios';
import client from './client';

interface authProp {
    username: string,
    password: string
}
export const login: ({ username, password }: authProp)=> Promise<AxiosResponse<void>> = ({ username, password }: authProp) => client.post('/auth/login', {
    username,
    password,
});

export const register: ({ username, password }: authProp)=> Promise<AxiosResponse<void>> = ({ username, password }: authProp) => client.post('/auth/signup', {
    username,
    password,
});

export const check: ()=> Promise<AxiosResponse<boolean>> = () => client.get('/auth/login');
