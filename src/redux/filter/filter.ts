/* eslint-disable no-param-reassign */
import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: filterModule.StateType = {
    category: null,
    platform: null,
    program: null,
    sorting: 'popular',
};

type filterSliceType = Slice<filterModule.StateType, {
    setFilter(state: WritableDraft<filterModule.StateType>, action: PayloadAction<{
        type: string;
        set: string;
    }>): void;
}, 'FILTER'>
const filterSlice: filterSliceType = createSlice({
    name: 'FILTER',
    initialState,
    reducers: {
        setFilter(state: WritableDraft<filterModule.StateType>, action: PayloadAction<{type: string, set: string}>) {
            state[action.payload.type] = action.payload.set;
        },
    },
});
export const FILTER: string = filterSlice.name;
export default filterSlice.reducer;
export const filterAction: filterModule.ActionType = filterSlice.actions;
