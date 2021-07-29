import { combineReducers, CombinedState, Reducer } from 'redux';
import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import { authActionType, authStateType } from './auth/authType';
import loading from './loading/loading';
import { LoadingActionType, loadingStateType } from './loading/loadingType';
import { userActionType, userStateType } from './user/userType';
import user, { userSaga } from './user/user';
import { videoReducerActionType, videoStateType } from './Video/videoType';
import videoReducer, { getVideoSaga } from './Video/video';

export interface rootStateType{
    auth: authStateType
    loading: loadingStateType
    user: userStateType
    videoReducer: videoStateType
}
export type rootActionType =
    |authActionType
    |LoadingActionType
    |userActionType
    |videoReducerActionType

export type rootReducerType = Reducer<CombinedState<rootStateType>, rootActionType>;

const rootReducer: rootReducerType = combineReducers({
    auth,
    loading,
    user,
    videoReducer,
});
export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
    yield all([authSaga(), userSaga(), getVideoSaga()]);
}

export default rootReducer;
