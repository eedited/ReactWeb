import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import { VIDEO } from '../../lib/api/video';
import './UserMaybeLike.scss';

interface props{
    videos: VIDEO[]
}
const MoreByUser: React.FC<props> = ({ videos }: props) => (
    <>
        <div>추천동영상</div>
        <div className="user-may-be-like">
            {
                videos.map((video: VIDEO) => (
                    <VideoContainer
                        videoInfo={video}
                    />
                ))
            }
        </div>
    </>
);

export default MoreByUser;
