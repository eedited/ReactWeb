import React from 'react';
import qs from 'qs';
import { Redirect, RouteComponentProps } from 'react-router';
import VideoInfoContainer from '../containers/Video/LargeVideoContainer';
import BaseTemplate from './BaseTemplate';
import LargeVideoDescription from '../containers/Video/LargeVideoDescriptionContainer';
import MoreByUser from '../containers/Video/MoreByUserContainer';
import UserMabyLike from '../containers/Video/UserMaybeLike';
import VideoHeader from '../containers/Video/VideoHeader';

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
            {/* <section>
                discription

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque blanditiis, animi molestias fuga corrupti sint laborum eum tempora incidunt autem quasi sit dolorum amet nam minus veniam modi fugiat deleniti quos quam sapiente, quaerat inventore necessitatibus? Eveniet nihil doloremque minima maxime ducimus esse, illo in sit ullam placeat! Est, quisquam!
            </section> */}
            <hr />
            <MoreByUser />
            <hr />
            <UserMabyLike />
        </BaseTemplate>
    );
};

export default VideoPage;
