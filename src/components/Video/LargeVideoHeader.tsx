import React from 'react';
import LikeButtonContainer from '../../containers/Video/LikeButtonContainer';
import './LargeVideoHeader.scss';

interface props {
    video: videoRouter.videoSuccessResponse
}

const LargeVideoDescription: React.FC<props> = ({ video }: props) => (
    <div className="LargeVideoHeader">
        <div className="LargeVideoHeader__main">
            <img className="LargeVideoHeader__main__profileIcon" src="https://bambam-bucket-for-service.s3.ap-northeast-2.amazonaws.com/img/profile-image.png" alt="profile" />
            <div className="LargeVideoHeader__main__rest">
                <div className="LargeVideoHeader__main__rest__title">{ video.title }</div>
                <div className="LargeVideoHeader__main__rest__nickname">{ video.User.nickname }</div>
            </div>
        </div>
        <div className="LargeVideoHeader__iconlist">
            <img className="LargeVideoHeader_iconlist__icon" src="/icons/follow-button.png" alt="" />
            <img className="LargeVideoHeader_iconlist__icon" src="/icons/chat-button.png" alt="" />
            <LikeButtonContainer video={video} />
        </div>
    </div>
);

export default LargeVideoDescription;
