import { AxiosResponse } from 'axios';
import client from './client';

type searchFunctionType=({ toFind, page }: SearchRouter.SearchRequest) => Promise<AxiosResponse<SearchRouter.SearchSuccessResponse>>;
export const search: searchFunctionType = ({ toFind, page }: SearchRouter.SearchRequest) => client.get(`/search/?toFind=${toFind}&page=${page}`);
