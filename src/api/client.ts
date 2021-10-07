import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://192.168.11.23:9712',
});

export default client;
