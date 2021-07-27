import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../modules/loading/loading';
import { authFunctionType, authReturnProp } from './api/auth';
import { signupActionType } from '../modules/auth/authType';

export const createRequestActionTypes: (type: string)=> string[] = (type: string) => {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};
interface responseType{
    data: unknown
}
// 액션 타입을 어케 정의할지 매우 고민이 됩니다. 쓰는 놈들을 합쳐서 여기에 넣어줘야하나?
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
