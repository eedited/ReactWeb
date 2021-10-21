import React from 'react';
import LikeButtonCountContainer from '../../../../containers/landing/LikeButtonCountContainer';
import './VideoDescription2.scss';

interface Props {
    videoInfo: Video
}

const VideoDescription2: React.FC<Props> = ({ videoInfo }: Props) => (
    <div className="video__description2">
        <div className="video__description__title">{videoInfo.title}</div>
        <div className="video__description__detail">
            <div className="video__description__left">
                <LikeButtonCountContainer Video={videoInfo} />
                <div className="video__description__detail__viewCount">
                    <img className="video__description__detail__viewCount__icon" src="/icons/view-icon.png" alt="view" />
                    <div>{videoInfo.viewCnt}</div>
                </div>
            </div>
            <div className="video__description__right">
                <div className="video__description__tag">{videoInfo.category}</div>
            </div>
        </div>
    </div>
);

export default VideoDescription2;
