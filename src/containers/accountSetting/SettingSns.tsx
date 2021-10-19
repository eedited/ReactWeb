import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { setSns } from '../../api/user';
import BlueButton from '../../components/common/button/BlueButton';
import useInputs, { inputType } from '../../hooks/useInputs';

interface Props{
    user: User
}
interface SubmitResponse {
    success: UserRouter.SetSnsSuccessResponse | null
    failure: AxiosError | null
    loading: boolean
}
const SettingSns: React.FC<Props> = ({ user }: Props) => {
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null, loading: false });
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        Facebook: '',
        Instagram: '',
        LinkendIn: '',
    });
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        setSubmitResponse({ success: null, failure: null, loading: true });
        (async () => {
            try {
                const response: AxiosResponse<UserRouter.SetSnsSuccessResponse> = await setSns({ facebook: inputState.Facebook, instagram: inputState.Instagram, linkedin: inputState.LinkendIn });
                setSubmitResponse({ ...submitResponse, success: response });
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    setSubmitResponse({ ...submitResponse, failure: err });
                }
            }
        })();
        setSubmitResponse({ ...submitResponse, loading: false });
    }, [inputState.Facebook, inputState.Instagram, inputState.LinkendIn, submitResponse]);
    return (
        <form onSubmit={onSubmit}>
            <div className="accountSetting__body__wrapper">
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        Facebook
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="Facebook" onChange={onInputChange} value={inputState.Facebook} />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        Instagram
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="Instagram" onChange={onInputChange} value={inputState.Instagram} />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        LinkendIn
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="LinkendIn" onChange={onInputChange} value={inputState.LinkendIn} />
                </div>
                {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                {submitResponse.success && <div>회원정보 변경이 완료되었습니다.</div> }
                <BlueButton type="submit" onClick={() => { /**/ }}>비밀번호 변경</BlueButton>
            </div>
        </form>
    );
};

export default SettingSns;
