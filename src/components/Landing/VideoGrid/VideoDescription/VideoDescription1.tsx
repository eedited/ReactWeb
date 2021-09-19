import React from 'react';
import { Link } from 'react-router-dom';
import LikeButtonCountContainer from '../../../../containers/landing/LikeButtonCountContainer';
import './VideoDescription1.scss';

interface Props {
    videoInfo: Video
}

const VideoDescription1: React.FC<Props> = ({ videoInfo }: Props) => (
    <div className="video__description1">
        <div className="video__description__title">{videoInfo.title}</div>
        <div className="video__description__detail">
            <div className="video__description__uploader">
                <Link to={`/profile?userId=${videoInfo.uploader}`} className="video__description__uploader__name">{videoInfo.User.nickname}</Link>
                <div className="video__description__uploader__follow">
                    {/* onClick함수 필요함. */}
                    <img className="video__description__uploader__follow__icon" src="/icons/follow-icon.png" alt="follow-icon" />
                    <div>
                        {' '}
                        팔로우
                    </div>
                </div>
            </div>
            <LikeButtonCountContainer Video={videoInfo} />
        </div>
    </div>
);

export default VideoDescription1;
