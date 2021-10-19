import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useState } from 'react';
import { changePassword } from '../../api/auth';
import BlueButton from '../../components/common/button/BlueButton';
import useInputs, { inputType } from '../../hooks/useInputs';
import './Setting.scss';
import { validatePassword } from '../../services/regex';

interface Props{
    user: User
}

interface SubmitResponse {
    success: AuthRouter.ChangePasswordSuccessResponse | null
    failure: AuthRouter.ChangePasswordFailureResponse | null
}
const SettingPassword: React.FC<Props> = ({ user }: Props) => {
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null });
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        currentPassword: '',
        newPassword: '',
        passwordConfirm: '',
    });
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        (async function f() {
            e.preventDefault();
            setSubmitResponse({ success: null, failure: null }); setErrMsg(null);
            if (inputState.newPassword !== inputState.passwordConfirm) {
                setErrMsg('패스워드 확인을 다시 해주세요!');
                setInput('currentPassword', '');
                setInput('newPassword', '');
                setInput('passwordConfirm', '');
                return;
            }
            if (!validatePassword(inputState.newPassword)) {
                setErrMsg('비밀번호는 최소8자, 문자, 숫자를 각각 하나씩 포함해야합니다.');
                setInput('currentPassword', '');
                setInput('newPassword', '');
                setInput('passwordConfirm', '');
                return;
            }
            try {
                const response: AxiosResponse<UserRouter.MypageModifySuccessResponse> = await changePassword({ currentPassword: inputState.currentPassword, newPassword: inputState.newPassword });
                setSubmitResponse({ success: response, failure: null });
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    setErrMsg('패스워드가 틀렸습니다!');
                }
                else {
                    setErrMsg('네트워크 에러');
                }
                setSubmitResponse({ success: null, failure: { error: err as Error } });
                setInput('currentPassword', '');
                setInput('newPassword', '');
                setInput('passwordConfirm', '');
            }
        }());
    }, [inputState.currentPassword, inputState.newPassword, inputState.passwordConfirm, setInput]);
    return (
        <form onSubmit={onSubmit}>
            <div className="accountSetting__body__wrapper">
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        현재 비밀번호
                    </div>
                    <input className="accountSetting__body__userInfo__input" type="password" name="currentPassword" onChange={onInputChange} value={inputState.currentPassword} />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        새로운 비밀번호
                    </div>
                    <input className="accountSetting__body__userInfo__input" type="password" name="newPassword" onChange={onInputChange} value={inputState.newPassword} />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        비밀번호 확인
                    </div>
                    <input className="accountSetting__body__userInfo__input" type="password" name="passwordConfirm" onChange={onInputChange} value={inputState.passwordConfirm} />
                </div>
                {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                {submitResponse.success && <div>회원정보 변경이 완료되었습니다.</div> }
                <BlueButton type="submit" onClick={() => { /**/ }}>비밀번호 변경</BlueButton>
            </div>
        </form>
    );
};

export default SettingPassword;
