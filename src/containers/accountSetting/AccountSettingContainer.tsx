import React from 'react';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import './AccountSetting.scss';
import RecieveDiscomfort from './RecieveDiscomfort';
import SettingMyPage from './SettingMyPage';
import SettingPassword from './SettingPassword';

interface FromReducerType{
    user: User|null
}
interface Props{
    param: string; // mypage, password, request
}
interface TextMapType {
    [type: string]: string
}

const textMap: TextMapType = {
    mypage: '프로필 변경',
    password: '비밀번호 변경',
    request: '건의사항',
};

const AccountSettingContainer: React.FC<Props> = ({ param }: Props) => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const { user }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        user: state.userReducer.user,
    }));
    return user ? (
        <div className="accountSetting">
            <div className="accountSetting__header">
                <img className="accountSetting__header__profileImg" alt="" src={user.profilePicture} />
                <div className="accountSetting__header__title">
                    {user.nickname}
                    {' '}
                    /
                    {' '}
                    {textMap[param]}
                </div>
            </div>
            <div className="accountSetting__body">
                <div className="accountSetting__body__left">
                    <Link to="/AccountSetting/mypage">프로필 변경</Link>
                    <Link to="/AccountSetting/password">비밀번호 변경</Link>
                    <Link to="/AccountSetting/request">요청</Link>
                </div>
                <div className="accountSetting__body__right">
                    {(param === 'mypage') && <SettingMyPage user={user} />}
                    {(param === 'password') && <SettingPassword user={user} />}
                    {(param === 'request') && <RecieveDiscomfort user={user} />}
                </div>
            </div>
        </div>
    )
        : <></>;
};

export default AccountSettingContainer;
