import {
    call, ForkEffect, put, takeLatest,
} from 'redux-saga/effects';
import { userAction } from './user';
import { authAction } from '../auth/auth';
import { authActionType } from '../auth/authType';
import * as authApi from '../../lib/api/auth';
import { userActionType } from './userType';
import { loadingAction } from '../loading/loading';

function* logoutSaga() {
    const { intializeForm }: authActionType = authAction;
    yield put(loadingAction.startLoading({ status: 'USER/logout' }));
    try {
        yield call(authApi.logout);
        yield put(intializeForm());
        sessionStorage.removeItem('user');
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
export default function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { logout }: userActionType = userAction;
    yield takeLatest(logout, logoutSaga);
}
