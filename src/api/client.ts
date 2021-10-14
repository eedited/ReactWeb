import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL,
});

export default client;
