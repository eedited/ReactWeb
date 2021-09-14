import {
    AnyAction, CombinedState, combineReducers, Reducer,
} from '@reduxjs/toolkit';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import userSaga from './user/userSaga';
import getVideoSaga from './Video/videoSaga';
import authReducer from './auth/auth';
import loadingReducer, { LoadingStateType } from './loading/loading';
import userReducer from './user/user';
import videoReducer from './Video/video';
import filterReducer from './filter/filter';

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
    yield all([authSaga(), userSaga(), getVideoSaga()]);
}

const rootReducer: Reducer<CombinedState<{
    authReducer: RDXAuthModule.StateType;
    loadingReducer: LoadingStateType;
    userReducer: RDXUserModule.StateType;
    videoReducer: RDXVideoModule.StateType;
    filterReducer: RDXFilterModule.StateType
}>, AnyAction> = combineReducers({
    authReducer,
    loadingReducer,
    userReducer,
    videoReducer,
    filterReducer,
});

export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>
