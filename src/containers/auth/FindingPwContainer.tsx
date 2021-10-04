import React, { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import client from '../../api/client';
import useInputs, { inputType } from '../../hooks/useInputs';
import FindingPw, { FindPwResponseType } from '../../components/auth/FindingPw';

type loadingState = 'start' | 'success' | 'failure';

const FindingPwContainer: React.FC = () => {
    const [isSubmit, setIsSubmit]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [loadingState, React.Dispatch<React.SetStateAction<loadingState>>] = useState<loadingState>('failure');
    const [findPwResponse, setFindPwResponse]: [FindPwResponseType, React.Dispatch<React.SetStateAction<FindPwResponseType>>] = useState<FindPwResponseType>({ password: '' });
    const [inputState, onInputChange, onInputClear]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        email: '',
        validationString: '',
        id: '',
    });
    const { email, validationString, id }: inputType = inputState;

    const responseFunction: () => Promise<void> = useCallback(
        async () => {
            setLoading('start');
            try {
                const response: AxiosResponse<FindPwResponseType> = await client.post('/auth/find/password', {
                    userId: id,
                    email: inputState.email,
                });
                setLoading('success');
                setFindPwResponse(response.data);
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        console.log(err.response.status);
                        setFindPwResponse({
                            info: err.response.status,
                            error: err,
                        });
                    }
                }
                setLoading('failure');
            }
        }, [id, inputState.email],
    );

    const onEmailSubmit: () => void = () => {
        setIsSubmit(true);
        responseFunction();
    };

    return (
        <FindingPw
            onInputChange={onInputChange}
            email={email}
            id={id}
            onEmailSubmit={onEmailSubmit}
            isSubmit={isSubmit}
            loading={loading}
            validationString={validationString}
            findPwResponse={findPwResponse}
        />
    );
};

export default FindingPwContainer;
