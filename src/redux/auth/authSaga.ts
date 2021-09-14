import { ForkEffect, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { CreateRequestSagaReturnType } from '../createRequestSaga';
import { authAction } from './auth';
import * as authAPI from '../../api/auth';

const signupSaga: CreateRequestSagaReturnType<AuthRouter.SignupRequest, AuthRouter.AuthSuccessResponse> = createRequestSaga('AUTH/signup', authAPI.signup);
const loginSaga: CreateRequestSagaReturnType<AuthRouter.LoginRequest, AuthRouter.AuthSuccessResponse> = createRequestSaga('AUTH/login', authAPI.login);

export default function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { signup, login }: RDXAuthModule.ActionType = authAction;
    yield takeLatest(signup, signupSaga);
    yield takeLatest(login, loginSaga);
}
