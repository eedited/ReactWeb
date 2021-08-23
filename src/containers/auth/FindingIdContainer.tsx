import React, { useState, useCallback } from 'react';
import client from '../../lib/api/client';
import useInputs, { inputType } from '../../lib/hooks/useInputs';
import FindingId from '../../components/auth/FindingId';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface findIdSuccessType {}
interface findIdFailureType{
    info: string
    error: Error
}
type findIdResponseType = findIdFailureType | findIdSuccessType
type loadingState = string
const FindingIdContainer: React.FC = () => {
    const [isSubmit, setIsSubmit]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [loadingState, React.Dispatch<React.SetStateAction<loadingState>>] = useState<loadingState>('');
    const [findIdResponse, setFindIdResponse]: [findIdResponseType, React.Dispatch<React.SetStateAction<findIdResponseType>>] = useState<findIdResponseType>({});
    const [inputState, onInputChange]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void] = useInputs({
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
                setFindIdResponse({
                    info: err.response.data,
                    error: err,
                });
            }
        }, [inputState.email],
    );
    const onEmailSubmit: () => void = () => {
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
