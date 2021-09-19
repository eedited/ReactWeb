/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const initialState: RDXFilterModule.StateType = {
    category: null,
    platform: null,
    program: null,
    sorting: 'popular',
};

type FilterSliceType = Slice<RDXFilterModule.StateType, {
    setFilter(state: WritableDraft<RDXFilterModule.StateType>, action: PayloadAction<{
        type: string;
        set: string;
    }>): void;},
'FILTER'>

const filterSlice: FilterSliceType = createSlice({
    name: 'FILTER',
    initialState,
    reducers: {
        setFilter(state: WritableDraft<RDXFilterModule.StateType>, action: PayloadAction<{type: string, set: string}>) {
            state[action.payload.type] = action.payload.set;
        },
    },
});

export const FILTER: string = filterSlice.name;
export default filterSlice.reducer;
export const filterAction: RDXFilterModule.ActionType = filterSlice.actions;
