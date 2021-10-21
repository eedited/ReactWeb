import React from 'react';
import { Link } from 'react-router-dom';
import FollowerButtonCountContainer from '../../../../containers/landing/FollowerButtonCountContainer';
import './UserDescription.scss';

interface Props {
    userInfo: User
}

const UserDescription: React.FC<Props> = ({ userInfo }: Props) => (
    <div className="user__description">
        <div className="user__description__title">
            <Link to={`/profile?userId=${userInfo.userId}`} className="user__description__title__link">{userInfo.nickname}</Link>
        </div>
        <div className="user__description__second">
            <div className="user__description__detail">
                <Link to={`/profile?userId=${userInfo.userId}`} className="user__description__detail__link">{userInfo.description}</Link>
            </div>
            <div className="user__description__right">
                <FollowerButtonCountContainer User={userInfo} />
            </div>
        </div>
    </div>
);

export default UserDescription;
