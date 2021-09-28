import { AxiosResponse } from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { AnyAction } from 'redux';
import { myPageModify } from '../../api/user';
import BlueButton from '../../components/common/Button/BlueButton';
import { useAppDispatch } from '../../hooks';
import useInputs, { inputType } from '../../hooks/useInputs';
import { userAction } from '../../redux/user/user';
import './Setting.scss';

interface Props{
    user: User
}

interface SubmitResponse {
    success: UserRouter.MypageModifySuccessResponse | null
    failure: UserRouter.MypageModifyFailureResponse | null
}

const SettingMyPage: React.FC<Props> = ({ user }: Props) => {
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        nickname: '',
    });
    const [descriptionText, setDescriptionTextChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null });
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionTextChange(e.target.value);
    };
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        (async function f() {
            e.preventDefault();
            setSubmitResponse({ success: null, failure: null });
            setErrMsg(null);
            try {
                const response: AxiosResponse<UserRouter.MypageModifySuccessResponse> = await myPageModify({ description: descriptionText, nickname: inputState.nickname });
                setSubmitResponse({ success: response, failure: null });
            }
            catch (err) {
                setSubmitResponse({ success: null, failure: { error: err as Error } });
                setErrMsg('이미 존재하는 닉네임입니다!');
            }
        }());
    }, [descriptionText, inputState.nickname]);
    useEffect(() => {
        setDescriptionTextChange((prevState: string) => user.description);
        setInput('nickname', user.nickname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
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
                        닉네임
                    </div>
                    <input className="accountSetting__body__userInfo__input" name="nickname" value={inputState.nickname} onChange={onInputChange} />
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        이메일
                    </div>
                    <div className="accountSetting__body__userInfo__unchange">
                        {user.email}
                    </div>
                </div>
                <div className="accountSetting__body__userInfo">
                    <div className="accountSetting__body__userInfo__tag">
                        description
                    </div>
                    <textarea className="accountSetting__body__userInfo__text" onChange={onDescriptionChange} value={descriptionText} />
                    <div className="accountSetting__body__userInfo__detail">본인에 대한 설명을 적어주세요!</div>
                </div>
                {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                {submitResponse.success && <div>회원정보 변경이 완료되었습니다.</div> }
                <BlueButton type="submit" onClick={() => { /**/ }}>SaveProfile</BlueButton>
            </div>
        </form>
    );
};

export default SettingMyPage;
