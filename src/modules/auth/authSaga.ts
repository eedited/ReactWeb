
import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../loading/loading';
import { authFunctionType, authReturnProp } from '../../lib/api/auth';
import {
    loginActionType, responseFailureType, responseSuccessType, signupActionType,
} from './authType';

type usedSagaType = 'auth/SIGNUP' | 'auth/LOGIN'
type usedSagaFunction = authFunctionType
type usedSagaActoin = loginActionType | signupActionType
interface responseDataType {
    data: responseFailureType|responseSuccessType
}
export type createRequetAuthSagaReturnType = (action: usedSagaActoin)=> Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, responseDataType>
export default function createRequestAuthSaga(type: usedSagaType, request: usedSagaFunction): createRequetAuthSagaReturnType {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: usedSagaActoin): Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, responseDataType> {
        yield put(startLoading(type));
        try {
            console.log(action.payload);
            const response: responseDataType = yield call<typeof request>(request, action.payload);
            console.log(response);
            yield put({
                type: SUCCESS,
                payload: response.data,
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
