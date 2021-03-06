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
                setErrMsg('???????????? ???????????? ??????????????????. discord??? ??????????????????');
            }
            setLoading(false);
        }());
    }, [descriptionText, inputState.title, setInput]);
    return (
        <>
            <Spinner loading={loading} />
            <div className="accountSetting__pageDescription">
                <div>eedited??? ?????? ?????? ?????????. ?????? ????????? ?????????????????? ?????????.??? ????????? ?????????????????????! ????????????</div>
                <div>?????? ?????????, ????????? ???????????? eedited??? ????????? ??? ???????????????!!</div>
                <div>??????????????? ????????? ??? ??? ????????? discord ????????? ???????????? ?????????.</div>
                <div>
                    ?????? ?????? :
                    {' '}
                    <a href="https://discord.gg/sMWzGfaHQK">https://discord.gg/sMWzGfaHQK</a>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="accountSetting__body__wrapper">
                    <div className="accountSetting__body__userInfo">
                        <div className="accountSetting__body__userInfo__tag">
                            ??????
                        </div>
                        <input className="accountSetting__body__userInfo__input" name="title" value={inputState.title} onChange={onInputChange} />
                    </div>
                    <div className="accountSetting__body__userInfo">
                        <div className="accountSetting__body__userInfo__tag">
                            ??????
                        </div>
                        <textarea className="accountSetting__body__userInfo__text" onChange={onDescriptionChange} value={descriptionText} />
                    </div>
                    {errMsg && <div className="accountSetting__Mypage__error">{errMsg}</div>}
                    {submitResponse.success && <div>??????????????? ?????????????????????.</div> }
                    <BlueButton type="submit" onClick={() => { /**/ }}>??????</BlueButton>
                </div>
            </form>
        </>
    );
};

export default RecieveDiscomfort;
