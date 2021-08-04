
import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../modules/loading/loading';

interface genericAction<T, P> {
    type: T,
    payload: P
}
interface RetrunProp<P>{
    data: P
}
type genericRequest<P, R> = (payload: P)=> Promise<AxiosResponse<R>>

export type createRequestSagaReturnType<P, R> = (action: genericAction<string, P>)=> Generator<CallEffect<AxiosResponse<R>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, RetrunProp<R>>

export default function createRequestSaga<P, R>(type: string, request: genericRequest<P, R>): createRequestSagaReturnType<P, R> {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: genericAction<string, P>): Generator<CallEffect<AxiosResponse<R>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, RetrunProp<R>> {
        yield put(startLoading(type));
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
        yield put(finishLoading(type));
    }
    return ret;
}
