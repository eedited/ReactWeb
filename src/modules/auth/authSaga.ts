import {
    ForkEffect, takeLatest,
} from 'redux-saga/effects';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import createRequestSaga, { createRequestSagaReturnType } from '../../lib/createRequestSaga';
import { authAction } from './auth';
import * as authAPI from '../../lib/api/auth';
import { loginPayloadType, signupPayloadType } from './authType';

const signupSaga: createRequestSagaReturnType<authAPI.signupProp, authAPI.authReturnProp> = createRequestSaga('auth/signup', authAPI.signup);
const loginSaga: createRequestSagaReturnType<authAPI.loginProp, authAPI.authReturnProp> = createRequestSaga('auth/login', authAPI.login);

export default function* authSaga(): Generator<ForkEffect<never>, void, unknown> {
    const { signup, login }: {
        signup: ActionCreatorWithPayload<signupPayloadType, string>,
        login: ActionCreatorWithPayload<loginPayloadType, string>,
    } = authAction;
    yield takeLatest(signup, signupSaga);
    yield takeLatest(login, loginSaga);
}
