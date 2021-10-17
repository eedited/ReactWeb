import React, { useMemo, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import AccountSettingContainer from '../containers/accountSetting/AccountSettingContainer';
import BaseTemplate from './BaseTemplate';
import { SelectorStateType, useAppSelector } from '../hooks';

interface FromReducerType {
    user: User | null
}

type Props = RouteComponentProps;
const validationParam: string[] = ['mypage', 'password', 'request'];

const AccountSettingPage: React.FC<Props> = ({ history, match }: Props) => {
    const {
        user,
    }: FromReducerType = useAppSelector(((state: SelectorStateType) => ({
        user: state.userReducer.user,
    })));
    const ret: string = useMemo(() => {
        const { param }: {param: string|undefined} = match.params as {param: string|undefined};
        if (param && !validationParam.includes(param)) {
            return 'error';
        }
        if (param === undefined) return 'mypage';
        return param;
    }, [match.params]);
    useEffect(() => {
        if (!user) {
            history.push('/');
        }
        if (ret === 'error') history.push('/404NotFound');
    }, [history, ret, user]);
    return (
        ret === 'error'
            ? <></>
            : (
                <BaseTemplate>
                    <AccountSettingContainer param={ret} />
                </BaseTemplate>
            )
    );
};

export default AccountSettingPage;
