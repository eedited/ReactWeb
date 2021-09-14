import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestSagaReturnType } from '../createRequestSaga';
import { authAction } from './auth';
import * as authAPI from '../../api/auth';

const signupSaga: createRequestSagaReturnType<AuthRouter.SignupRequest, AuthRouter.AuthSuccessResponse> = createRequestSaga('AUTH/signup', authAPI.signup);
const loginSaga: createRequestSagaReturnType<AuthRouter.LoginRequest, AuthRouter.AuthSuccessResponse> = createRequestSaga('AUTH/login', authAPI.login);

export default function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { signup, login }: RDXAuthModule.ActionType = authAction;
    yield takeLatest(signup, signupSaga);
    yield takeLatest(login, loginSaga);
}
