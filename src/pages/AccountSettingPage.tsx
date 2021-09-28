import React, { useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import AccountSettingContainer from '../containers/accountSetting/AccountSettingContainer';
import BaseTemplate from './BaseTemplate';

type Props = RouteComponentProps;
const validationParam: string[] = ['mypage', 'password', 'request'];
const AccountSettingPage: React.FC<Props> = ({ history, match }: Props) => {
    const ret: string = useMemo(() => {
        const { param }: {param: string|undefined} = match.params as {param: string|undefined};
        console.log(param);
        if (param && !validationParam.includes(param)) {
            return 'error';
        }
        if (param === undefined) return 'mypage';
        return param;
    }, [match.params]);
    if (ret === 'error') history.push('/404NotFound');
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
