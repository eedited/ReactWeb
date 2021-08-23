import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState } from 'redux';
import type { rootState, AppDispatch } from './index';
import { loadingStateType } from './modules/loading/loadingType';
import { userStateType } from './modules/user/userType';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => Dispatch<AnyAction> = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
export type selectorStateType = CombinedState<{
    authReducer: authModule.StateType;
    loadingReducer: loadingStateType;
    userReducer: userStateType;
    videoReducer: videoModule.StateType;
}>;
