// redux-actions라는 라이브러리가 있으나, typescript에 매우 ㅈ같이 되어있기 때문에 본인은 쌩 redux로 구현
import {
    sampleActionType, sampleActionType2, authState, authType,
} from './authTypes';
// 액션 정의
const SAMPLE_ACTION: string = 'SAMPLE_ACTION' as const;
const SAMPLE_ACTION2: string = 'SAMPLE_ACTION2' as const;
// 액션 생성 함수
export const sampleAction: ()=> sampleActionType = () => ({
    type: SAMPLE_ACTION,
});
export const sampleAction2: (x: number)=> sampleActionType2 = (x: number) => ({
    type: SAMPLE_ACTION,
    x,
});
// 초기 state
const initialState: authState = {
    x: 0,
};
// reducer정의
function sampleReducer(state: authState = initialState, action: authType): authState {
    switch (action.type) {
        case SAMPLE_ACTION:
            return {
                x: state.x + 1,
            };
        case SAMPLE_ACTION2:
            return {
                x: state.x + (action as sampleActionType2).x,
            };
        default:
            return state;
    }
}
export default sampleReducer;
