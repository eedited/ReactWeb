import React, { useReducer } from 'react';

export interface inputType{
    [key: string]: string
}
interface changeType{
    type: 'CHANGE'
    payload: HTMLInputElement
}
interface clearType{
    type: 'CLEAR'
    payload: string
}
type reducerType = changeType | clearType
function reducer(state: inputType, action: reducerType): inputType {
    if (action.type === 'CHANGE') {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    if (action.type === 'CLEAR') {
        return {
            ...state,
            [action.payload]: '',
        };
    }
    return state;
}

export default function useInputs(initialForm: inputType): [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string) => void] {
    const [state, dispatch]: [inputType, React.Dispatch<reducerType>] = useReducer(reducer, initialForm);
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'CHANGE' as const,
            payload: e.target,
        });
    };
    const onClear: (name: string) => void = (name: string) => {
        dispatch({
            type: 'CLEAR' as const,
            payload: name,
        });
    };
    return [state, onChange, onClear];
}
