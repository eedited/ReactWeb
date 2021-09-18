import React, { useReducer } from 'react';

export interface inputType {
    [key: string]: string
}
interface changeType {
    type: 'CHANGE'
    payload: HTMLInputElement
}
interface setType {
    type: 'SET'
    payload: {
        name: string,
        value: string
    }
}
type reducerType = changeType | setType;

function reducer(state: inputType, action: reducerType): inputType {
    if (action.type === 'CHANGE') {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    if (action.type === 'SET') {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    return state;
}

export default function useInputs(initialForm: inputType): [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] {
    const [state, dispatch]: [inputType, React.Dispatch<reducerType>] = useReducer(reducer, initialForm);
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'CHANGE' as const,
            payload: e.target,
        });
    };
    const setInput: (name: string, value: string) => void = (name: string, value: string = '') => {
        dispatch({
            type: 'SET' as const,
            payload: {
                name,
                value,
            },
        });
    };
    return [state, onChange, setInput];
}
