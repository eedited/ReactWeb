import axios, { AxiosResponse } from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { AnyAction } from 'redux';
import { discomfort, myPageModify } from '../../api/user';
import BlueButton from '../../components/common/button/BlueButton';
import Spinner from '../../components/common/spinner/Spinner';
import useInputs, { inputType } from '../../hooks/useInputs';
import './Setting.scss';

interface Props{
    user: AuthRouter.CheckSuccessResponse
}

interface SubmitResponse {
    success: UserRouter.DiscomfortSuccessResponse | null
    failure: UserRouter.DiscomfortFailureResponse | null
}

const RecieveDiscomfort: React.FC<Props> = ({ user }: Props) => {
    const [inputState, onInputChange, setInput]: [inputType, (e: React.ChangeEvent<HTMLInputElement>) => void, (name: string, value: string) => void] = useInputs({
        title: '',
    });
    const [descriptionText, setDescriptionTextChange]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null });
    const [errMsg, setErrMsg]: [string|null, React.Dispatch<React.SetStateAction<string|null>>] = useState<string|null>(null);
    const [loading, setLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionTextChange(e.target.value);
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        (async function f() {
            e.preventDefault();
            setSubmitResponse({ success: null, failure: null });
            setLoading(true);
            setErrMsg(null);
            try {
                const response: AxiosResponse<UserRouter.MypageModifySuccessResponse> = await discomfort({ description: descriptionText, title: inputState.title });
                setSubmitResponse({ success: response, failure: null });
                setInput('title', '');
                setDescriptionTextChange('');
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setSubmitResponse({ success: null, failure: { info: err.response.data.info } });
                    }
                }
                setErrMsg('이메일을 보내는데 실패했습니다. discord로 문의해주세요');
            }
            setLoading(false);
        }());
    }, [descriptionText, inputState.title, setInput]);
    return (
        <>
            <Spinner loading={loading} />
            <div className="accountSetting__pageDescription">
                <div>eedited가 어떤 점이 아쉽다. 어떤 기능이 추가되었으면 좋겠다.가 있으면 이야기해주세요! ☺️☺️</div>
                <div>매주 새롭고, 빠르게 발전하는 eedited를 발견할 수 있을거에요!!</div>
                <div>유저분들과 소통을 할 수 있도록 discord 채널도 운영하고 있어요.</div>
                <div>
                    초대 링크 :
                    {' '}
                    <a href="https://discord.gg/sMWzGfaHQK">https://discord.gg/sMWzGfaHQK</a>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="accountSetting__body__wrapper">
                    <div className="accountSetting__body__userInfo">
                        <div className="accountSetting__body__userInfo__tag">
                            제목
                        </div>
                        <input className="accountSetting__body__userInfo__input" name="title" value={inputState.title} onChange={onInputChange} />
                    </div>
                    <div className="accountSetting__body__userInfo">
                        <div className="accountSetting__body__userInfo__tag">
                            설명
                        </div>
                        <textarea className="accountSetting__body__userInfo__text" onChange={onDescriptionChange} value={descriptionText} />
                    </div>
                    {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                    {submitResponse.success && <div>성공적으로 제출되었습니다.</div> }
                    <BlueButton type="submit" onClick={() => { /**/ }}>제출</BlueButton>
                </div>
            </form>
        </>
    );
};

export default RecieveDiscomfort;
