import React, { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import client from '../../lib/api/client';
import useInputs, { inputType } from '../../lib/hooks/useInputs';
import FindingId from '../../components/auth/FindingId';

interface findIdResponseType{
    id?: string,
    exists?: boolean,
    success?: boolean
}
type loadingState = 'start'|'success'|'failure'
const FindingIdContainer: React.FC = () => {
    const [isSubmit, setIsSubmit]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [loadingState, React.Dispatch<React.SetStateAction<loadingState>>] = useState<loadingState>('start');
    const [findIdResponse, setFindIdResponse]: [findIdResponseType, React.Dispatch<React.SetStateAction<findIdResponseType>>] = useState<findIdResponseType>({});
    const [inputState, onInputChange]: [inputType, (e: React.ChangeEvent<HTMLInputElement>)=> void] = useInputs({
        email: '',
        validationString: ' ',
    });
    const { email, validationString }: inputType = inputState;
    const responseFunction: ()=> Promise<void> = useCallback(
        async () => {
            setLoading('start');
            try {
                const response: AxiosResponse<findIdResponseType> = await client.post('/auth/find/id', { email: inputState.email });
                setLoading('success');
                setFindIdResponse(response.data);
            }
            catch (err) {
                setLoading('failure');
            }
        }, [inputState.email],
    );
    const onEmailSubmit: ()=> void = () => {
        setIsSubmit(true); responseFunction();
    };
    return (
        <FindingId
            onInputChange={onInputChange}
            email={email}
            onEmailSubmit={onEmailSubmit}
            isSubmit={isSubmit}
            loading={loading}
            validationString={validationString}
        />
    );
};

export default FindingIdContainer;
