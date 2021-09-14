import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import BaseTemplate from './BaseTemplate';
import MyPageContainer from '../containers/myPage/MyPageContainer';

type Props = RouteComponentProps;

const ProfilePage: React.FC<Props> = ({ location }: Props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { userId }: qs.ParsedQs = query;
    return (
        <BaseTemplate>
            {
                typeof (userId) === 'string' ? <MyPageContainer userId={userId} /> : (
                    <Redirect to={{
                        pathname: '/404NotFound',
                    }}
                    />
                )
            }
        </BaseTemplate>
    );
};

export default ProfilePage;
