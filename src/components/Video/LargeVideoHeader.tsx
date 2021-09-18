import React from 'react';
import { Link } from 'react-router-dom';
import LikeButtonContainer from '../../containers/video/LikeButtonContainer';
import FollowButtonContainer from '../../containers/video/FollowButtonContainer';
import './LargeVideoHeader.scss';

interface Props {
    video: VideoRouter.VideoSuccessResponse
    user: AuthRouter.CheckSuccessResponse | null
}

const LargeVideoDescription: React.FC<Props> = ({ video, user }: Props) => (
    <div className="LargeVideoHeader">
        <div className="LargeVideoHeader__main">
            <img className="LargeVideoHeader__main__profileIcon" src="https://bambam-bucket-for-service.s3.ap-northeast-2.amazonaws.com/img/profile-image.png" alt="profile" />
            <div className="LargeVideoHeader__main__rest">
                <div className="LargeVideoHeader__main__rest__title">{ video.title }</div>
                <Link className="LargeVideoHeader__main__rest__nickname" to={`/profile?userId=${video.uploader}`}>{ video.User.nickname }</Link>
            </div>
        </div>
        <div className="LargeVideoHeader__iconlist">
            <FollowButtonContainer video={video} />
            <div className="LargeVideoHeader_iconlist__icon__wrapper">
                <img className="LargeVideoHeader_iconlist__icon" src="/icons/chat-icon.png" alt="" />
            </div>
            <LikeButtonContainer video={video} />
            {
                user && user.userId === video.uploader && (
                    <Link to={`/change/?videoId=${video.id}`}>
                        <div className="LargeVideoHeader_iconlist__icon__wrapper">
                            <img className="LargeVideoHeader_iconlist__icon" src="/icons/setting-icon.png" alt="" />
                        </div>
                    </Link>
                )
            }
        </div>
    </div>
);

export default LargeVideoDescription;
