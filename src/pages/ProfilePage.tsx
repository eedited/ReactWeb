import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import MyPage from '../components/myPage/MyPage';
import BaseTemplate from './BaseTemplate';

type props = RouteComponentProps
const ProfilePage: React.FC<props> = ({ location }: props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { userId }: qs.ParsedQs = query;
    return (
        <BaseTemplate>
            <>
                {
                    typeof (userId) === 'string'
                        ? <MyPage userId={userId} />
                        : (
                            <Redirect to={{
                                pathname: '/404NotFound',
                            }}
                            />
                        )
                }
            </>
        </BaseTemplate>
    );
};

export default ProfilePage;
