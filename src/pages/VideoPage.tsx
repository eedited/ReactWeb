import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import VideoInfoContainer from '../containers/Video/LargeVideoContainer';
import BaseTemplate from './BaseTemplate';
import LargeVideoDescription from '../containers/Video/LargeVideoDescriptionContainer';
import MoreByUser from '../containers/Video/MoreByUserContainer';
import UserMabyLike from '../containers/Video/UserMaybeLike';
import VideoHeader from '../containers/Video/VideoHeader';
import HorizonLine from '../components/common/HorizonLine/HorizonLine';

type props = RouteComponentProps

const VideoPage: React.FC<props> = ({ location }: props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { videoId }: qs.ParsedQs = query;
    return (
        <BaseTemplate>
            <VideoHeader />
            <>
                {
                    typeof (videoId) === 'string'
                        ? <VideoInfoContainer videoId={videoId} />
                        : (
                            <Redirect to={{
                                pathname: '/404NotFound',
                            }}
                            />
                        )
                }
            </>
            <LargeVideoDescription />
            <HorizonLine />
            <MoreByUser />
            <HorizonLine />
            <UserMabyLike />
        </BaseTemplate>
    );
};

export default VideoPage;
