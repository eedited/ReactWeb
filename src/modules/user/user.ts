import {
    call, put, takeLatest, ForkEffect,
} from 'redux-saga/effects';
import {
    setUserActionType, userStateType, userActionType, logoutActionType,
} from './userType';
import * as authApi from '../../lib/api/auth';
import { initializeForm } from '../auth/auth';
// 액션 정의
export const SET_USER: string = 'SET_USER';
export const LOGOUT: string = 'LOGOUT';

// 액션 생성함수 정의
type setUserFunctionType = ({ userId }: {userId: string})=> setUserActionType
export const setUser: setUserFunctionType = ({ userId }: {userId: string}) => ({
    type: SET_USER,
    payload: {
        userId,
    },
});

type logoutFunctionType = ()=> logoutActionType
export const logout: logoutFunctionType = () => ({
    type: LOGOUT,
});

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
export function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(LOGOUT, logoutSaga);
}

// 초기 상태 정의
const initialState: userStateType = {
    user: null,
};
// 리듀서 정의
function user(state: userStateType = initialState, action: userActionType): userStateType {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    userId: (action as setUserActionType).payload.userId,
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
