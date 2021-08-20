import {
    createSlice, PayloadAction, Slice,
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { filterActionType, filterStateType } from './filterType';

const initialState: filterStateType = {
    category: null,
    platform: null,
    program: null,
    sorting: 'popular',
};
type filterSliceType = Slice<filterStateType, {
    setFilter(state: WritableDraft<filterStateType>, action: PayloadAction<{
        type: string;
        set: string;
    }>): void;
}, 'FILTER'>
const filterSlice: filterSliceType = createSlice({
    name: 'FILTER',
    initialState,
    reducers: {
        setFilter(state: WritableDraft<filterStateType>, action: PayloadAction<{type: string, set: string}>) {
            state[action.payload.type] = action.payload.set;
        },
    },
});
export const FILTER: string = filterSlice.name;
export default filterSlice.reducer;
export const filterAction: filterActionType = filterSlice.actions;
