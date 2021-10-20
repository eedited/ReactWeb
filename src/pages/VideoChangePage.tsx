import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import VideoChangeContainer from '../containers/upload/VideoChangeContainer';
import { SelectorStateType, useAppSelector } from '../hooks';

interface FromReducerType {
    user: AuthRouter.CheckSuccessResponse | null
}
type Props = RouteComponentProps;

const VideoChangePage: React.FC<Props> = ({ history, location }: Props) => {
    const {
        user,
    }: FromReducerType = useAppSelector(((state: SelectorStateType) => ({
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
