import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export type filterKey = 'category' | 'platform' | 'program' | 'sorting';
export interface filterStateType {
    [key: string]: string | null;
    category: string | null;
    platform: string | null;
    program: string | null;
    sorting: 'popular' | 'recent';
}
export type filterActionType = CaseReducerActions<{
    setFilter(state: WritableDraft<filterStateType>, action: PayloadAction<{
        type: string;
        set: string;
    }>): void;
}>
