import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { AnyAction } from 'redux';
import { deleteUser } from '../../api/auth';
import BlueButton from '../../components/common/button/BlueButton';
import WhiteButton from '../../components/common/button/WhiteButton';
import { useAppDispatch } from '../../hooks';
import { userAction } from '../../redux/user/user';

import './Setting.scss';

interface Props extends RouteComponentProps{
    user: AuthRouter.CheckSuccessResponse
}
interface StateType{
    confirm: boolean
    isClickable: boolean
    confirmText: string
}
interface SubmitResponse {
    success: AuthRouter.DeleteuserSuccessResponse | null
    failure: AxiosError | null;
    loading: boolean
}
const deleteString: string = '탈퇴 하기';
const DeleteUser: React.FC<Props> = ({ user, history }: Props) => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const [state, setState]: [StateType, React.Dispatch<React.SetStateAction<StateType>>] = useState<StateType>({
        confirm: false,
        confirmText: '',
        isClickable: true,
    });
    const [submitResponse, setSubmitResponse]: [SubmitResponse, React.Dispatch<React.SetStateAction<SubmitResponse>>] = useState<SubmitResponse>({ success: null, failure: null, loading: false });
    const submitDelete: (userId: string) => void = useCallback((userId: string) => {
        (async () => {
            setSubmitResponse({ success: null, failure: null, loading: true });
            try {
                const response: AxiosResponse<AuthRouter.DeleteuserSuccessResponse> = await deleteUser({ userId });
                setSubmitResponse({ ...submitResponse, success: response });
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    setSubmitResponse({ ...submitResponse, failure: err });
                }
            }
            setSubmitResponse({ ...submitResponse, loading: false });
        })();
    }, [submitResponse]);
    const onClick: () => void = () => {
        if (!state.confirm) {
            setState({ ...state, confirm: true, isClickable: false });
        }
        else {
            submitDelete(user.userId);
        }
    };
    useEffect(() => {
        if (submitResponse.success) {
            localStorage.removeItem('user');
            dispatch(userAction.check());
            history.push('/');
        }
    }, [dispatch, history, submitResponse.success]);
    const onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, confirmText: e.target.value, isClickable: (!state.confirm || e.target.value === deleteString) });
    };
    return (
        <>
            <div className="accountSetting__delete__description">
                <div>탈퇴하기 버튼을 누르시면 더 이상 저희 서비스가 제공하는 관리 서비스를 받으실 수 없습니다.</div>
                <div>
                    저희 서비스에 어떤 문제가 있다면, 탈퇴를 하시기보다는
                    <a href={process.env.REACT_APP_DISCORD_LINK} style={{ color: '#4B89DC' }}>디스코드</a>
                    에 원하는 기능을 알려주시는게 어떨까요?
                </div>
                <div>
                    최대한 빠르게 불편하신점, 필요한 기능을 해소할 수 있도록 노력할게요😭
                </div>
            </div>
            <div className="accountSetting__delete__body">
                {
                    state.confirm
                && <input className="accountSetting__delete__body__input" onChange={onInputChange} placeholder={deleteString} />
                }
                {state.isClickable
                    ? <BlueButton type="button" onClick={onClick}>탈퇴하기</BlueButton>
                    : <WhiteButton onClick={() => { /**/ }}>탈퇴하기</WhiteButton>}
            </div>
            <div className="accountSetting__delete__error">{submitResponse.failure && submitResponse.failure.response?.data.info}</div>
        </>
    );
};

export default withRouter(DeleteUser);
