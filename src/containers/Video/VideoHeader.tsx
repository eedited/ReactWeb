import React from 'react';
import { selectorStateType, useAppSelector } from '../../hooks';
import LargeVideoHeader from '../../components/Video/LargeVideoHeader';

interface fromReducerType{
    Video: videoRouter.videoSuccessResponse|null
    User: authRouter.checkSuccessResponse | null
}

const LargeVideoHeaderContainer: React.FC = () => {
    const {
        Video, User,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        Video: state.videoReducer.video,
        User: state.userReducer.user,
    }));
    if (Video === null) {
        return <div />;
    }
    return (
        <LargeVideoHeader video={Video} user={User} />
    );
};

export default LargeVideoHeaderContainer;
