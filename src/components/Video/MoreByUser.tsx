import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import { VIDEO } from '../../lib/api/video';
import './MoreByUser.scss';

interface props{
    videos: VIDEO[]
}
const MoreByUser: React.FC<props> = ({ videos }: props) => (
    <>
        <div>이 편집자의 다른 동영상</div>
        <div className="more-by-user">
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
