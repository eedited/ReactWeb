import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global{
    interface DropDownProp {
        id: number,
        title: string,
        selected: boolean,
        key: string
        set: string|null
    }
    namespace RDXFilterModule{
        interface StateType{
            upload: DropDownProp[]
        }
        interface setUpload{
            set: string|null;
        }
         type ActionType = CaseReducerActions<{
             setUpload(state: WritableDraft<RDXFilterModule.StateType>, action: PayloadAction<RDXFilterModule.setUpload>);
         }>;
    }
}
