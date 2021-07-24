import { call, put, takeLatest } from 'redux-saga/effects';
import { setUserActionType, userStateType, userActionType } from './userType';
import * as authApi from '../../lib/api/auth';
import { initializeForm } from '../auth/auth';

export const SET_USER: string = 'SET_USER';
export const LOGOUT: string = 'LOGOUT';
type setUserFunctionType = ({ userId }: {userId: string})=> setUserActionType
export const setUser: setUserFunctionType = ({ userId }: {userId: string}) => ({
    type: SET_USER,
    payload: {
        userId,
    },
});
interface logoutActionType{
    type: string
}
export const logout: ()=> logoutActionType = () => ({
    type: LOGOUT,
});
const initialState: userStateType = {
    user: null,
};
function* logoutSaga() {
    try {
        yield call(authApi.logout);
        yield put(initializeForm('login'));
        yield put(initializeForm('register'));
        sessionStorage.removeItem('user');
    }
    catch (e) {
        console.log(e);
    }
}
export function* userSaga() {
    yield takeLatest(LOGOUT, logoutSaga);
}
function user(state: userStateType = initialState, action: userActionType): userStateType {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    userId: action.payload.userId,
                },
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default: {
            return state;
        }
    }
}
export default user;
