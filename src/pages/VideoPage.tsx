import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import VideoInfoContainer from '../containers/Video/LargeVideoContainer';
import BaseTemplate from './BaseTemplate';

type props = RouteComponentProps

const VideoPage: React.FC<props> = ({ location }: props) => {
    const query: qs.ParsedQs = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { videoId }: qs.ParsedQs = query;
    return (
        <BaseTemplate>
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
        </BaseTemplate>
    );
};

export default VideoPage;
