import React from 'react';
import User from '../../components/landing/userGrid/User';

interface Props {
    userInfo: User
    key?: string
}

const UserContainer: React.FC<Props> = ({ userInfo, key }: Props) => (
    <User
        userInfo={userInfo}
        key={key}
    />
);

UserContainer.defaultProps = {
    key: '',
};

export default React.memo(UserContainer);
