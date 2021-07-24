import { combineReducers, CombinedState, Reducer } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import { authActionType, authStateType } from './auth/authType';
import loading from './loading/loading';
import { LoadingActionType, loadingStateType } from './loading/loadingType';
import { userActionType, userStateType } from './user/userType';
import user, { userSaga } from './user/user';

export interface rootStateType{
    auth: authStateType
    loading: loadingStateType
    user: userStateType
}
export type rootActionType =
    |authActionType
    |LoadingActionType
    |userActionType

export type rootReducerType = Reducer<CombinedState<rootStateType>, rootActionType>;

const rootReducer: rootReducerType = combineReducers({
    auth,
    loading,
    user,
});
export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}

export default rootReducer;
