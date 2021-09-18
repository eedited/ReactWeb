import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import VideoInfoContainer from '../containers/video/LargeVideoContainer';
import BaseTemplate from './BaseTemplate';
import LargeVideoDescription from '../containers/video/LargeVideoDescriptionContainer';
import MoreByUser from '../containers/video/MoreByUserContainer';
import UserMabyLike from '../containers/video/UserMaybeLike';
import VideoHeader from '../containers/video/VideoHeader';
import HorizonLine from '../components/common/horizonLine/HorizonLine';

type Props = RouteComponentProps;

const VideoPage: React.FC<Props> = ({ location }: Props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { videoId }: qs.ParsedQs = query;

    return (
        <BaseTemplate>
            <VideoHeader />
            {
                typeof (videoId) === 'string' ? <VideoInfoContainer videoId={videoId} /> : (
                    <Redirect to={{
                        pathname: '/404NotFound',
                    }}
                    />
                )
            }
            <LargeVideoDescription />
            <HorizonLine />
            <MoreByUser />
            <HorizonLine />
            <UserMabyLike />
        </BaseTemplate>
    );
};

export default VideoPage;
