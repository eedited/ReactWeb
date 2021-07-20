import { combineReducers, CombinedState, Reducer } from 'redux';
import auth from './auth/auth';
import { authState, authType } from './auth/authTypes';

export interface rootStateType{
    auth: authState
}
export type rootActionType = authType
export type rootReducerType = Reducer<CombinedState<rootStateType>, rootActionType>;
const rootReducer: rootReducerType = combineReducers({
    auth,
});

export default rootReducer;
