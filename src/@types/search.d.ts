import { CaseReducerActions, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

export declare global {
    namespace SearchRouter{
        interface SearchRequest{
            toFind: string
            page: number
        }
        interface SearchSuccessResponse{
            users: User[]
            videos: Video[]
        }
        interface SearchFailureResponse{
            error: Error
        }
    }
}
