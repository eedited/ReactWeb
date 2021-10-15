import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { userAction } from './user';
import { authAction } from '../auth/auth';
import * as api from '../../api/auth';
import { loadingAction } from '../loading/loading';

function* logoutSaga() {
    const { intializeForm }: RDXAuthModule.ActionType = authAction;
    yield put(loadingAction.startLoading({ status: 'USER/logout' }));
    try {
        yield call(api.logout);
        yield put(intializeForm());
        yield put({
            type: 'USER/logoutSuccess',
        });
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
        const response: {data: AuthRouter.CheckSuccessResponse} = yield call(api.check);
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
    yield put(loadingAction.finishLoading({ status: 'USER/check' }));
}
export default function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { logout, check }: RDXUserModule.ActionType = userAction;
    yield takeLatest(logout, logoutSaga);
    yield takeLatest(check, checkSaga);
}
