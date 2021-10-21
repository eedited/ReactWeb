import React from 'react';
import { Link } from 'react-router-dom';
import './User.scss';

interface Props {
    userInfo: User
    key: string|undefined
}

const User: React.FC<Props> = ({ userInfo, key }: Props) => (
    <div className="userElement" key={key}>
        <div
            className="user"
        >
            <Link to={`/profile?userId=${userInfo.nickname}`}>
                <img
                    className="user__img"
                    src={userInfo.profilePicture}
                    alt=""
                />
            </Link>
        </div>
    </div>
);

export default React.memo(User);
