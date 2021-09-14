import { Dispatch } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState } from 'redux';
import type { rootState, AppDispatch } from '../index';

import { LoadingStateType } from '../redux/loading/loading';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => Dispatch<AnyAction> = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
export type SelectorStateType = CombinedState<{
    authReducer: RDXAuthModule.StateType;
    loadingReducer: LoadingStateType;
    userReducer: RDXUserModule.StateType;
    videoReducer: RDXVideoModule.StateType;
}>;
