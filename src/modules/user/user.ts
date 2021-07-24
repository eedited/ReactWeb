import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes, createRequestSagaReturnType } from '../../lib/createRequestSaga';
import {
    userType, tempSetUserActionType, checkActionType, checkFunctionType, checkSuccessActionType, checkFailureActionType, checkFailureFunctionType, checkSuccessFunctionType, userActionType, userStateType, tempSetUserFunctionType,
} from './userType';
import * as authAPI from '../../lib/api/auth';

const TEMP_SET_USER: string = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE]: string[] = createRequestActionTypes(
    'user/CHECK',
);

export const tempSetUser: tempSetUserFunctionType = (user: userType) => ({
    type: TEMP_SET_USER,
    payload: {
        user,
    },
});

export const check: checkFunctionType = () => ({
    type: CHECK,
});
const checkSaga: createRequestSagaReturnType = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
}
export const checkSuccess: checkSuccessFunctionType = () => ({
    type: CHECK_SUCCESS,
});

export const checkFailure: checkFailureFunctionType = () => ({
    type: CHECK_FAILURE,
});

export const initialState: userStateType = {
    user: null,
    checkError: null,
};

function userReducer(state: userStateType = initialState, action: userActionType): userStateType {
    const checkSuccessAction: checkSuccessActionType = (action as checkSuccessActionType);
    const checkFailureAction: checkFailureActionType = (action as checkFailureActionType);
    switch (action.type) {
        case TEMP_SET_USER:
            return {
                ...state,
                user: (action as tempSetUserActionType).payload.user,
            };
        case CHECK_SUCCESS:
            if (checkSuccessAction.payload !== undefined) {
                return {
                    ...state,
                    user: checkSuccessAction.payload.user,
                    checkError: null,
                };
            }
            return state;
        case CHECK_FAILURE:
            if (checkFailureAction.payload !== undefined) {
                return {
                    ...state,
                    user: null,
                    checkError: checkFailureAction.payload.error,
                };
            }
            return state;
        default:
            return state;
    }
}
export default userReducer;
