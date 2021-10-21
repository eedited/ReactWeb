import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import FollowerButtonCount from '../../components/landing/userGrid/buttons/FollowerButtonCount';

interface Props {
    User: User | null
}

const FollowerButtonCountContainer: React.FC<Props> = ({ User }: Props) => {
    if (User === null) return <div />;
    return (
        <FollowerButtonCount
            followerCnt={User.followerCnt}
        />
    );
};

export default FollowerButtonCountContainer;
