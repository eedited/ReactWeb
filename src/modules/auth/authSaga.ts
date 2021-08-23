import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';
import { authAction } from './auth';
import * as authAPI from '../../lib/api/auth';
import { authActionType } from './authType';

const signupSaga: createRequestSagaReturnType<authAPI.signupProp, authAPI.authReturnProp> = createRequestSaga('AUTH/signup', authAPI.signup);
const loginSaga: createRequestSagaReturnType<authAPI.loginProp, authAPI.authReturnProp> = createRequestSaga('AUTH/login', authAPI.login);

export default function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { signup, login }: authActionType = authAction;
    yield takeLatest(signup, signupSaga);
    yield takeLatest(login, loginSaga);
}
