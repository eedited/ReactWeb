import {
    call, ForkEffect, put, takeLatest,
} from 'redux-saga/effects';
import { userAction } from './user';
import { authAction } from '../auth/auth';
import { authActionType } from '../auth/authType';
import * as authAPI from '../../library/api/auth';
import { userActionType } from './userType';
import { loadingAction } from '../loading/loading';
import createRequestSaga, { createRequestSagaReturnType } from '../../library/createRequestSaga';

function* logoutSaga() {
    const { intializeForm }: authActionType = authAction;
    yield put(loadingAction.startLoading({ status: 'USER/logout' }));
    try {
        yield call(authAPI.logout);
        yield put(intializeForm());
        localStorage.removeItem('user');
    }
    catch (e) {
        yield put({
            type: 'USER/logoutFailure',
            payload: {
                error: e,
            },
        });
    }
    yield put(loadingAction.finishLoading({ status: 'USER/logout' }));
}
function* checkSaga() {
    yield put(loadingAction.startLoading({ status: 'USER/check' }));
    try {
        const response: {data: authAPI.checkSuccessReturnProp} = yield call(authAPI.check);
        yield put({
            type: 'USER/checkSuccess',
            payload: {
                ...response.data,
            },
        });
    }
    catch (e) {
        yield put({
            type: 'USER/checkFailure',
            payload: {
                error: e,
                ...e.response.data,
            },
        });
    }
    yield put(loadingAction.finishLoading({ status: 'USER/logout' }));
}
export default function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { logout, check }: userActionType = userAction;
    yield takeLatest(logout, logoutSaga);
    yield takeLatest(check, checkSaga);
}
