import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global{
    namespace filterModule{
        export type filterKey = 'category' | 'platform' | 'program' | 'sorting';
        interface StateType{
            [key: string]: string | null;
            category: null,
            platform: null,
            program: null,
            sorting: 'popular',
        }
        type ActionType =CaseReducerActions<{
            setFilter(state: WritableDraft<StateType>, action: PayloadAction<{
                type: string;
                set: string;
            }>): void;
        }>

    }
}
