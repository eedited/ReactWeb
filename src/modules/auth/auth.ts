import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import {
    changeFieldActionType, initializeFormActionType, authStateType, authActionType,
} from './authType';

// 액션 정의
export const CHANGE_FIELD: string = 'auth/CHANG_FIELD' as const;
export const INITIALIZE_FORM: string = 'auth/INITIALIZE_FORM' as const;

// 액션 생성함수 정의
type changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string})=> changeFieldActionType
export const changeField: changeFieldFunctionType = ({ form, key, value }: {form: string, key: string, value: string}) => ({
    type: CHANGE_FIELD,
    form, // TODO register or login
    key, // state의 키값. username or password or passwordConfirm
    value, // 이번에 바뀌어야할 value
});
type initializeFormFunctionType= (form: string)=> initializeFormActionType
export const initializeForm: initializeFormFunctionType = (form: string) => ({
    type: INITIALIZE_FORM,
    form, // 이번에 초기화가 되어야할 form, register or login임
});

// 초기 상태 정의
const initialState: authStateType = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
};

// reducer 정의. immer 사용
function auth(state: authStateType = initialState, action: authActionType) {
    return produce(state, (draft: WritableDraft<authStateType>) => {
        switch (action.type) {
            case CHANGE_FIELD:
                draft[action.form][(action as changeFieldActionType).key] = (action as changeFieldActionType).value; // state의 state[form][key]를 action.value로 바꾼다.
                return draft;
            case INITIALIZE_FORM:
                draft[action.form] = initialState[action.form]; // 이번 form 녀석을 바꿔버린다.
                return draft;
            default:
                return draft;
        }
    });
}
export default auth;
