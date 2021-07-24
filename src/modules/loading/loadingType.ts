import { START_LOADING } from './loading';

export interface LoadingActionType{
    type: typeof START_LOADING,
    payload: string
}
export interface loadingStateType{
    [key: string]: boolean
}
