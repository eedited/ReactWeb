import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestSagaReturnType } from '../../library/createRequestSaga';
import { authAction } from './auth';
import * as authAPI from '../../library/api/auth';

const signupSaga: createRequestSagaReturnType<authRouter.singupRequest, authRouter.authSuccessResponse> = createRequestSaga('AUTH/signup', authAPI.signup);
const loginSaga: createRequestSagaReturnType<authRouter.loginRequest, authRouter.authSuccessResponse> = createRequestSaga('AUTH/login', authAPI.login);

export default function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { signup, login }: authModule.ActionType = authAction;
    yield takeLatest(signup, signupSaga);
    yield takeLatest(login, loginSaga);
}
