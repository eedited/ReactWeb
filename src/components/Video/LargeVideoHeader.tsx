import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import LikeButtonContainer from '../../containers/Video/LikeButtonContainer';
import FollowButtonContainer from '../../containers/Video/FollowButtonContainer';
import './LargeVideoHeader.scss';

interface Props extends RouteComponentProps{
    video: VideoRouter.VideoSuccessResponse
    user: AuthRouter.CheckSuccessResponse | null
}

const LargeVideoDescription: React.FC<Props> = ({ video, user, history }: Props) => (
    <div className="LargeVideoHeader">
        <div className="LargeVideoHeader__main">
            <img className="LargeVideoHeader__main__profileIcon" src={video.User.profilePicture} alt="profile" />
            <div className="LargeVideoHeader__main__rest">
                <div className="LargeVideoHeader__main__rest__title">{ video.title }</div>
                <Link className="LargeVideoHeader__main__rest__nickname" to={`/profile?userId=${video.uploader}`}>{ video.User.nickname }</Link>
            </div>
        </div>
        <div className="LargeVideoHeader__iconlist">
            <FollowButtonContainer video={video} userId={user ? user.userId : null} />
            <button
                className="LargeVideoHeader_iconlist__icon__wrapper"
                onClick={() => {
                    history.push('/chat');
                }}
                type="button"
            >
                <img className="LargeVideoHeader_iconlist__icon" src="/icons/chat-icon.png" style={{ opacity: 0.3 }} alt="" />
            </button>
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

export default withRouter(LargeVideoDescription);
