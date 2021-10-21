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
        LinkedIn: user.linkedin,
    });
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitResponse({ success: null, failure: null, loading: true });
        setErrMsg('');
        if (inputState.Facebook && inputState.Facebook.indexOf('facebook') === -1) {
            setErrMsg('페이스북 url이 올바르지 않습니다!');
            return;
        }
        if (inputState.Instagram && inputState.Instagram.indexOf('instagram') === -1) {
            setErrMsg('인스타그램 url이 올바르지 않습니다!');
            return;
        }
        if (inputState.LinkedIn && inputState.LinkedIn.indexOf('linkedin') === -1) {
            setErrMsg('링크드인 url이 올바르지 않습니다!');
            return;
        }
        (async () => {
            try {
                const response: AxiosResponse<UserRouter.SetSnsSuccessResponse> = await setSns({ facebook: inputState.Facebook, instagram: inputState.Instagram, linkedin: inputState.LinkedIn });
                setSubmitResponse({ ...submitResponse, success: response });
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    setSubmitResponse({ ...submitResponse, failure: err });
                    setErrMsg('네트워크 에러');
                }
            }
        })();
        setSubmitResponse({ ...submitResponse, loading: false });
    }, [inputState.Facebook, inputState.Instagram, inputState.LinkedIn, submitResponse]);
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
                        LinkedIn
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="LinkedIn" onChange={onInputChange} value={inputState.LinkedIn} placeholder="https://www.linkedin.com/in/{user고유번호}/" />
                </div>
                {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                {submitResponse.success && <div>회원정보 변경이 완료되었습니다.</div> }
                <BlueButton type="submit" onClick={() => { /**/ }}>변경</BlueButton>
            </div>
        </form>
    );
};

export default SettingSns;
