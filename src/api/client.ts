import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://172.31.6.191',
});

export default client;
