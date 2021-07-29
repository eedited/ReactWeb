
import {
    call, put, CallEffect, PutEffect,
} from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { startLoading, finishLoading } from '../loading/loading';
import { getVideoFunctionType, videoReturnProp } from '../../lib/api/video';
import {
    videoActionType, videoFailureType, videoListActionType, videoSuccessType,
} from './videoType';

type usedSagaType = 'video/VIDEO_LIST' | 'video/VIDEO'
type usedSagaRequest = getVideoFunctionType
type usedSagaAction = videoActionType|videoListActionType
type usedSagaReturnProp = videoReturnProp|videoReturnProp[]
interface responseDataType {
    data: videoSuccessType|videoFailureType
}
export type createRequestVideoSagaReturnType = (action: usedSagaAction)=> Generator<CallEffect<AxiosResponse<usedSagaReturnProp>> | PutEffect<{
    type: string;
    payload: unknown;
}>, void, responseDataType>
export default function createRequestVideoSaga(type: usedSagaType, request: usedSagaRequest): createRequestVideoSagaReturnType {
    const SUCCESS: string = `${type}_SUCCESS`;
    const FAILURE: string = `${type}_FAILURE`;

    function* ret(action: usedSagaAction): Generator<CallEffect<AxiosResponse<usedSagaReturnProp>> | PutEffect<{
        type: string;
        payload: unknown;
    }>, void, responseDataType> {
        yield put(startLoading(type));
        try {
            let response: responseDataType;
            if (action.payload !== null && action.payload !== undefined) {
                response = yield call<typeof request>(request, action.payload);
            }
            else {
                response = yield call<typeof request>(request);
            }
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
