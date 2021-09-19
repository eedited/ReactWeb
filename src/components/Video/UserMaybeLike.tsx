import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription/VideoDescription2';
import './UserMaybeLike.scss';

interface Props {
    videos: Video[]
}

const MoreByUser: React.FC<Props> = ({ videos }: Props) => (
    <div className="user-may-be-like">
        <div className="user-may-be-like__title">추천동영상</div>
        <div className="user-may-be-like__video">
            {
                videos.map((video: Video, idx: number) => (
                    idx < 6
                        ? (
                            <div key={video.id}>
                                <VideoContainer videoInfo={video} />
                                <VideoDescription2 videoInfo={video} />
                            </div>
                        )
                        : <></>
                ))
            }
        </div>
    </div>
);

export default MoreByUser;
