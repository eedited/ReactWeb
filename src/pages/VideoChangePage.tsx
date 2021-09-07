import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import VideoChangeContainer from '../containers/upload/VideoChangeContainer';
import { selectorStateType, useAppSelector } from '../hooks';

interface fromReducerType{
    user: USER|null
}
type props = RouteComponentProps
const VideoChangePage: React.FC<props> = ({ history, location }: props) => {
    const {
        user,
    }: fromReducerType = useAppSelector(((state: selectorStateType) => ({
        user: state.userReducer.user,
    })));
    if (!user) {
        history.push('/404NotFound');
    }
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { videoId }: qs.ParsedQs = query;
    return (
        <BaseTemplate>
            <>
                {
                    typeof (videoId) === 'string'
                        ? <VideoChangeContainer videoId={videoId} user={user} />
                        : (
                            <Redirect to={{ pathname: '/404NotFound' }} />
                        )

                }
            </>

        </BaseTemplate>
    );
};

export default withRouter(VideoChangePage);
