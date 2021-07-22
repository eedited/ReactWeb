import { combineReducers, CombinedState, Reducer } from 'redux';
import auth from './auth/auth';
import { authActionType, authStateType } from './auth/authType';

export interface rootStateType{
    auth: authStateType
}
export type rootActionType = authActionType
export type rootReducerType = Reducer<CombinedState<rootStateType>, rootActionType>;
const rootReducer: rootReducerType = combineReducers({
    auth,
});

export default rootReducer;
