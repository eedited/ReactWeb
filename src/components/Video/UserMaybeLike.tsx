import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription2';

import './UserMaybeLike.scss';

interface props{
    videos: VIDEO[]
}
const MoreByUser: React.FC<props> = ({ videos }: props) => (
    <>
        <div className="user-may-be-like__title">추천동영상</div>
        <div className="user-may-be-like">
            {
                videos.map((video: VIDEO, idx: number) => {
                    if (idx < 6) {
                        return (
                            <div key={video.id}>
                                <VideoContainer videoInfo={video} />
                                <VideoDescription2 videoInfo={video} />
                            </div>
                        );
                    }
                    return <></>;
                })
            }
        </div>
    </>
);

export default MoreByUser;
