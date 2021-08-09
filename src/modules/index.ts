import {
    AnyAction, CombinedState, combineReducers, Reducer,
} from '@reduxjs/toolkit';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import userSaga from './user/userSaga';
import getVideoSaga from './Video/videoSaga';
import authReducer from './auth/auth';
import loadingReducer from './loading/loading';
import userReducer from './user/user';
import videoReducer from './Video/video';
import filterReducer from './filter/filter';
import { authStateType } from './auth/authType';
import { loadingStateType } from './loading/loadingType';
import { userStateType } from './user/userType';
import { videoStateType } from './Video/videoType';
import { filterStateType } from './filter/filterType';

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
    yield all([authSaga(), userSaga(), getVideoSaga()]);
}

const rootReducer: Reducer<CombinedState<{
    authReducer: authStateType;
    loadingReducer: loadingStateType;
    userReducer: userStateType;
    videoReducer: videoStateType;
    filterReducer: filterStateType
}>, AnyAction> = combineReducers({
    authReducer,
    loadingReducer,
    userReducer,
    videoReducer,
    filterReducer,
});
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>
