import React, { useState, useCallback } from 'react';
import axios from 'axios';
import client from '../../api/client';
import useInputs, { inputType } from '../../hooks/useInputs';
import FindingId from '../../components/auth/FindingId';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FindIdSuccessType {}
interface FindIdFailureType {
    info: string
    error: Error
}
type FindIdResponseType = FindIdFailureType | FindIdSuccessType
type LoadingState = string

const FindingIdContainer: React.FC = () => {
    const [isSubmit, setIsSubmit]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [LoadingState, React.Dispatch<React.SetStateAction<LoadingState>>] = useState<LoadingState>('');
    const [findIdResponse, setFindIdResponse]: [FindIdResponseType, React.Dispatch<React.SetStateAction<FindIdResponseType>>] = useState<FindIdResponseType>({});
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        email: '',
        validationString: ' ',
    });
    const { email, validationString }: inputType = inputState;

    const responseFunction: () => Promise<void> = useCallback(
        async () => {
            setLoading('start');
            try {
                await client.post('/auth/find/id', { email: inputState.email });
                setLoading('success');
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setFindIdResponse({
                            info: err.response.data,
                            error: err,
                        });
                    }
                }
            }
        }, [inputState.email],
    );

    const onEmailSubmit: () => void = () => {
        setIsSubmit(true);
        responseFunction();
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
