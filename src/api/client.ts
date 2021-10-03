import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;
const axiosConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3000',
};
const client: AxiosInstance = axios.create(axiosConfig);

export default client;
