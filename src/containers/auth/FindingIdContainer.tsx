import React, { useState, useCallback } from 'react';
import axios from 'axios';
import client from '../../api/client';
import useInputs, { inputType } from '../../hooks/useInputs';
import FindingId, { FindIdResponseType, LoadingState } from '../../components/auth/FindingId';

const FindingIdContainer: React.FC = () => {
    const [isSubmit, setIsSubmit]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [LoadingState, React.Dispatch<React.SetStateAction<LoadingState>>] = useState<LoadingState>('failure');
    const [findIdResponse, setFindIdResponse]: [FindIdResponseType, React.Dispatch<React.SetStateAction<FindIdResponseType>>] = useState<FindIdResponseType>({});
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        email: '',
        validationString: ' ',
    });
    const { email, validationString }: inputType = inputState;

    const responseFunction: () => Promise<void> = useCallback(
        async () => {
            setIsSubmit(false);
            setLoading('start');
            try {
                await client.post('/auth/find/id', { email: inputState.email });
                setLoading('success');
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setFindIdResponse({
                            info: err.response.status,
                            error: err,
                        });
                    }
                }
                setLoading('failure');
            }
        }, [inputState.email],
    );

    const onEmailSubmit: () => void = () => {
        responseFunction();
        setIsSubmit(true);
    };

    return (
        <FindingId
            findIdResponse={findIdResponse}
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
