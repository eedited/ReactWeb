import React from 'react';
import UserContainer from '../../../containers/landing/UserContainer';
import UserDescription from './userDescription/UserDescription';

type UserInfo = User;
interface Props {
    userList: User[]
}

const UserGrid: React.FC<Props> = ({ userList }: Props) => (
    <div className="userGrid">
        {userList && userList.map((user: UserInfo, idx: number) => (
            <div key={user.userId}>
                <UserContainer userInfo={user} />
                <UserDescription userInfo={user} />
            </div>
        ))}
    </div>
);

export default UserGrid;
