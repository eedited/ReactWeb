import { LoadingActionType, loadingStateType } from './loadingType';
// 액션 정의
export const START_LOADING: string = 'loading/START_LOADING' as const;
export const FINISH_LOADING: string = 'loading/FINISH_LOADING' as const;
// 액션 생성함수 정의
type startLoadingFunctionType = (requestType: string)=> LoadingActionType;
export const startLoading: startLoadingFunctionType = (requestType: string) => ({
    type: START_LOADING,
    payload: { status: requestType },
});

type finishLoadingFunctionType = (requestType: string)=> LoadingActionType;
export const finishLoading: finishLoadingFunctionType = (requestType: string) => ({
    type: FINISH_LOADING,
    payload: { status: requestType },
});

// 초기 상태 정의
const initialState: loadingStateType = {};

// 리듀서 정의
function loading(state: loadingStateType = initialState, action: LoadingActionType): loadingStateType {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                [action.payload.status]: true,
            };
        case FINISH_LOADING:
            return {
                ...state,
                [action.payload.status]: false,
            };
        default:
            return state;
    }
}
export default loading;
