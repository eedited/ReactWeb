import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import BaseTemplate from './BaseTemplate';
import MyPageContainer from '../containers/myPage/MyPageContainer';

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
                        ? <MyPageContainer userId={userId} />
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
