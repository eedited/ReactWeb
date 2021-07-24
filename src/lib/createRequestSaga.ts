import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../modules/loading/loading';
import { authFunctionType, authReturnProp } from './api/auth';
import { registerActionType } from '../modules/auth/authType';

export const createRequestActionTypes: (type: string)=> string[] = (type: string) => {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};
interface responseType{
    data: unknown
}

export type createRequestSagaReturnType = (action: registerActionType)=> Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, responseType>

export default function createRequestSaga(type: string, request: authFunctionType): createRequestSagaReturnType {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: registerActionType): Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, responseType> {
        yield put(startLoading(type));
        try {
            const response: responseType = yield call<typeof request>(request, action.payload);
            console.log(response);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        }
        catch (err) {
            yield put({
                type: FAILURE,
                payload: err,
            });
        }
        yield put(finishLoading(type));
    }
    return ret;
}
