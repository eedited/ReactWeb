import React from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import VideoDescription1 from '../landing/videoGrid/videoDescription/VideoDescription1';
import './MoreByUser.scss';

interface Props {
    videos: Video[]
}

const MoreByUser: React.FC<Props> = ({ videos }: Props) => (
    <div className="more-by-user">
        <div className="more-by-user__title">이 편집자의 다른 동영상</div>
        <div className="more-by-user__video">
            {
                videos.map((video: Video, idx: number) => (
                    idx < 6
                        ? (
                            <div key={video.id}>
                                <VideoContainer videoInfo={video} />
                                <VideoDescription1 videoInfo={video} />
                            </div>
                        )
                        : <></>
                ))
            }
        </div>
    </div>
);

export default MoreByUser;
