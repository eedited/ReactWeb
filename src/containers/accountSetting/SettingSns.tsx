import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { AnyAction } from 'redux';
import { setSns } from '../../api/user';
import BlueButton from '../../components/common/button/BlueButton';
import { useAppDispatch } from '../../hooks';
import useInputs, { inputType } from '../../hooks/useInputs';
import { userAction } from '../../redux/user/user';

interface Props{
    user: AuthRouter.CheckSuccessResponse
}
interface SubmitResponse {
    success: UserRouter.SetSnsSuccessResponse | null
    failure: AxiosError | null
    loading: boolean
}
const SettingSns: React.FC<Props> = ({ user }: Props) => {
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null, loading: false });
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        Facebook: user.facebook,
        Instagram: user.instagram,
        LinkendIn: user.linkedin,
    });
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
    useEffect(() => {
        if (submitResponse.success) {
            dispatch(userAction.check());
        }
    }, [dispatch, submitResponse.success]);
    return (
        <form onSubmit={onSubmit}>
            <div className="accountSetting__body__wrapper">
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        Facebook
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="Facebook" onChange={onInputChange} value={inputState.Facebook} placeholder="https://www.facebook.com/profile.php?id={user고유번호}" />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        Instagram
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="Instagram" onChange={onInputChange} value={inputState.Instagram} placeholder="https://www.instagram.com/{userId}/" />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        LinkendIn
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="LinkendIn" onChange={onInputChange} value={inputState.LinkendIn} placeholder="https://www.linkedin.com/in/{user고유번호}/" />
                </div>
                {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                {submitResponse.success && <div>회원정보 변경이 완료되었습니다.</div> }
                <BlueButton type="submit" onClick={() => { /**/ }}>변경</BlueButton>
            </div>
        </form>
    );
};

export default SettingSns;
