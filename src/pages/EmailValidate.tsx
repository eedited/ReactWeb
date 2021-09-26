import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { RouteComponentProps } from 'react-router';
import { AxiosResponse } from 'axios';
import { signupValidation } from '../api/auth';

type Props = RouteComponentProps;
interface ValidateResponse {
    success: AuthRouter.SignupValidationSuccessResponse | null
    failure: Error | null
}
const EmailValidate: React.FC<Props> = ({ history, location }: Props) => {
    const [validateResponse, setValidateResponse]: [ValidateResponse, React.Dispatch<React.SetStateAction<ValidateResponse>>] = useState<ValidateResponse>({ success: null, failure: null });
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { token }: qs.ParsedQs = query;
    useEffect(() => {
        (async () => {
            setValidateResponse({ success: null, failure: null });
            if (typeof token !== 'string') {
                setValidateResponse({ success: null, failure: new Error() });
                return;
            }
            try {
                const response: AxiosResponse<AuthRouter.SignupValidationSuccessResponse> = await signupValidation({ token });
                setValidateResponse({ success: response, failure: null });
            }
            catch (e) {
                setValidateResponse({ success: null, failure: e as Error });
                console.log(e);
            }
        })();
    }, [token]);
    useEffect(() => {
        if (validateResponse.success) {
            history.push('/hello');
        }
        if (validateResponse.failure) {
            history.push('/Page404');
        }
    });
    return (
        <div />
    );
};

export default EmailValidate;
