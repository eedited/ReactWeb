import { FINISH_LOADING, START_LOADING } from './loading';

export interface LoadingActionType{
    type: typeof START_LOADING | typeof FINISH_LOADING,
    payload: {
        status: string
    }
}
export interface loadingStateType{
    [key: string]: boolean
}
