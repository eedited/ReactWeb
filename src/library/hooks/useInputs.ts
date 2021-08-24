import React, { useReducer } from 'react';

export interface inputType{
    [key: string]: string
}

function reducer(state: inputType, action: HTMLInputElement): inputType {
    return {
        ...state,
        [action.name]: action.value,
    };
}

export default function useInputs(initialForm: inputType): [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void] {
    const [state, dispatch]: [inputType, React.Dispatch<HTMLInputElement>] = useReducer(reducer, initialForm);
    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    };
    return [state, onChange];
}
