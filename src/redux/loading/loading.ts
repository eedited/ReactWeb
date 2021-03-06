/* eslint-disable no-param-reassign */
import { CaseReducerActions, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export interface LoadingStateType {
    [key: string]: boolean
}

const initialState: LoadingStateType = {};

type LoadingSliceType = Slice<LoadingStateType, {
    startLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{
        status: string;
    }>): void;
    finishLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{
        status: string;
    }>): void;
}, 'LOADING'>

const loadingSlice: LoadingSliceType = createSlice({
    name: 'LOADING',
    initialState,
    reducers: {
        startLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{status: string}>) {
            state[action.payload.status] = true;
        },
        finishLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{status: string}>) {
            state[action.payload.status] = false;
        },
    },
});

export const LOADING: string = loadingSlice.name;
export default loadingSlice.reducer;
export const loadingAction: CaseReducerActions<{
    startLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{
        status: string;
    }>): void;
    finishLoading(state: WritableDraft<LoadingStateType>, action: PayloadAction<{
        status: string;
    }>): void;
}> = loadingSlice.actions;
