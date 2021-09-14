import React from 'react';
import LikeButtonCountContainer from '../../../../containers/landing/LikeButtonCountContainer';
import './VideoDescription2.scss';

interface props {
    videoInfo: Video
}

const VideoDescription2: React.FC<props> = ({ videoInfo }: props) => (
    <div className="video__description2">
        <div className="video__description__title">{videoInfo.title}</div>
        <div className="video__description__detail">
            <LikeButtonCountContainer Video={videoInfo} />
            <div className="video__description__detail__viewCount">
                <img className="video__description__detail__viewCount__icon" src="/icons/view-icon.png" alt="view" />
                <div>{videoInfo.viewCnt}</div>
            </div>
        </div>
    </div>
);

export default VideoDescription2;
