import {
    call, ForkEffect, put, takeLatest,
} from 'redux-saga/effects';
import { userAction } from './user';
import { authAction } from '../auth/auth';
import { authActionType } from '../auth/authType';
import * as authApi from '../../lib/api/auth';
import { userActionType } from './userType';

function* logoutSaga() {
    const { intializeForm }: authActionType = authAction;
    try {
        yield call(authApi.logout);
        yield put(intializeForm());
        sessionStorage.removeItem('user');
    }
    catch (e) {
        console.log(e);
    }
}
export default function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { logout }: userActionType = userAction;
    yield takeLatest(logout, logoutSaga);
}
