import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription2';

import './MoreByUser.scss';

interface props{
    videos: VIDEO[]
}
const MoreByUser: React.FC<props> = ({ videos }: props) => (
    <>
        <div className="more-by-user__title">이 편집자의 다른 동영상</div>
        <div className="more-by-user">
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
                    return <div key={`uniquekey${idx * 2}`} />;
                })
            }
        </div>
    </>
);

export default MoreByUser;
