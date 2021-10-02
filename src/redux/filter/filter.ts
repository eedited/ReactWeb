/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

const UploadInitialState: DropDownProp[] = [
    {
        id: 0,
        title: '없음',
        selected: true,
        key: 'upload',
        set: null,
    },
    {
        id: 1,
        title: '브이로그',
        selected: false,
        key: 'upload',
        set: 'vlog',
    },
    {
        id: 2,
        title: '게임',
        selected: false,
        key: 'upload',
        set: 'game',
    },
    {
        id: 3,
        title: '뷰티',
        selected: false,
        key: 'upload',
        set: 'beauty',
    },
    {
        id: 4,
        title: 'IT/리뷰',
        selected: false,
        key: 'upload',
        set: 'review',
    },
    {
        id: 5,
        title: '스터디',
        selected: false,
        key: 'upload',
        set: 'study',
    },
    {
        id: 6,
        title: '기타',
        selected: false,
        key: 'upload',
        set: 'etc',
    },
];

const initialState: RDXFilterModule.StateType = {
    upload: UploadInitialState,
};
type filterSliceType= Slice<RDXFilterModule.StateType, {
    setUpload(state: WritableDraft<RDXFilterModule.StateType>, action: PayloadAction<RDXFilterModule.setUpload>): void;
}, 'FILTER'>
const filterSlice: filterSliceType = createSlice({
    name: 'FILTER',
    initialState,
    reducers: {
        setUpload(state: WritableDraft<RDXFilterModule.StateType>, action: PayloadAction<RDXFilterModule.setUpload>) {
            state.upload.forEach((cur: DropDownProp) => {
                cur.selected = false;
            });
            state.upload.forEach((cur: DropDownProp) => {
                if (action.payload.set === cur.set) {
                    cur.selected = true;
                }
            });
        },
    },
});

export const FILTER: string = filterSlice.name;
export default filterSlice.reducer;
export const filterAction: RDXFilterModule.ActionType = filterSlice.actions;
