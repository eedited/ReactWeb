import { call, put, CallEffect, PutEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { loadingAction } from './loading/loading';

interface GenericAction<T, P> {
    type: T,
    payload: P
}
interface RetrunProp<P> {
    data: P
}
type GenericRequest<P, R> = (payload: P) => Promise<AxiosResponse<R>>

export type CreateRequestSagaReturnType<P, R> = (action: GenericAction<string, P>) => Generator<CallEffect<AxiosResponse<R>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, RetrunProp<R>>

export default function createRequestSaga<P, R>(type: string, request: GenericRequest<P, R>): CreateRequestSagaReturnType<P, R> {
    const SUCCESS: string = `${type}Success`;
    const FAILURE: string = `${type}Failure`;

    function* ret(action: GenericAction<string, P>): Generator<CallEffect<AxiosResponse<R>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, RetrunProp<R>> {
        yield put(loadingAction.startLoading({ status: type }));
        try {
            const response: RetrunProp<R> = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: {
                    ...response.data,
                },
            });
        }
        catch (err) {
            yield put({
                type: FAILURE,
                payload: {
                    ...err.response.data,
                    error: err,
                },
            });
        }
        yield put(loadingAction.finishLoading({ status: type }));
    }
    return ret;
}
