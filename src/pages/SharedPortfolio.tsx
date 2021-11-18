import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { AxiosResponse } from 'axios';
import BasePortfolioTemplate from './BasePortfolioTemplate';
import MyPageContainer from '../containers/myPage/MyPageContainer';
import { UserExist } from '../api/user';

type Props = RouteComponentProps;

const SharedPortfolio: React.FC<Props> = ({ match, history }: Props) => {
    const { param }: { param: string | undefined } = match.params as { param: string | undefined };
    if (!param) {
        history.push('/404NotFound');
    }
    const userId: string = param as string;
    const [userName, setUserName]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');
    useEffect(() => {
        (async () => {
            try {
                const res: AxiosResponse<UserRouter.UserExistSuccessResponse> = await UserExist({ userId });
                setUserName(res.data.nickname);
            }
            catch {
                history.push('/404NotFound');
            }
        })();
    }, [history, userId]);

    return (
        typeof (userId) === 'string'
            ? (
                <BasePortfolioTemplate userName={userName}>
                    <MyPageContainer userId={userId} />
                </BasePortfolioTemplate>
            )
            : (
                <Redirect to={{
                    pathname: '/404NotFound',
                }}
                />
            )
    );
};

export default withRouter(SharedPortfolio);
