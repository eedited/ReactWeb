import {
    AnyAction, CombinedState, combineReducers, Reducer,
} from '@reduxjs/toolkit';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import authSaga from './auth/authSaga';
import userSaga from './user/userSaga';
import getVideoSaga from './Video/videoSaga';
import authReducer from './auth/auth';
import loadingReducer, { loadingStateType } from './loading/loading';
import userReducer from './user/user';
import videoReducer from './Video/video';
import filterReducer from './filter/filter';

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
    yield all([authSaga(), userSaga(), getVideoSaga()]);
}

const rootReducer: Reducer<CombinedState<{
    authReducer: authModule.StateType;
    loadingReducer: loadingStateType;
    userReducer: userModule.StateType;
    videoReducer: videoModule.StateType;
    filterReducer: filterModule.StateType
}>, AnyAction> = combineReducers({
    authReducer,
    loadingReducer,
    userReducer,
    videoReducer,
    filterReducer,
});
export default rootReducer;
export type rootState = ReturnType<typeof rootReducer>
