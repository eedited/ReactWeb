import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../modules/loading/loading';
import { authFunctionType, authReturnProp } from './api/auth';
import { signupActionType } from '../modules/auth/authType';

// 임시로 함수를 하나 만들었음.
import { getVideoFunctionType, videoFunctionType, videoReturnProp } from './api/video';
import { videoActionType } from '../modules/Video/video';

export const createRequestActionTypes: (type: string)=> string[] = (type: string) => {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};
interface responseType{
    data: unknown
}

// 비디오와 로그인 관련 axios를 여기서 다 처리하고 싶었으나, 타입스크립트를 잘 못써서 하루를 날리고 실패.
export type createRequestSagaReturnType = (action: signupActionType)=> Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, responseType>

export default function createRequestSaga(type: string, request: authFunctionType): createRequestSagaReturnType {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: signupActionType): Generator<CallEffect<AxiosResponse<authReturnProp>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, responseType> {
        yield put(startLoading(type));
        try {
            console.log(action.payload);
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
export type createVideoRequestSagaReturnType = (action: videoActionType)=> Generator<CallEffect<AxiosResponse<videoReturnProp>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, responseType>

export function createVideoRequestSaga(type: string, request: videoFunctionType): createVideoRequestSagaReturnType {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: videoActionType): Generator<CallEffect<AxiosResponse<videoReturnProp>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, responseType> {
        yield put(startLoading(type));
        try {
            console.log(action.payload);
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
