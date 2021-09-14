import React from 'react';
import { SelectorStateType, useAppSelector } from '../../hooks';
import LargeVideoHeader from '../../components/Video/LargeVideoHeader';

interface FromReducerType {
    Video: VideoRouter.VideoSuccessResponse | null
    User: AuthRouter.CheckSuccessResponse | null
}

const LargeVideoHeaderContainer: React.FC = () => {
    const {
        Video, User,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        Video: state.videoReducer.video,
        User: state.userReducer.user,
    }));
    return (Video === null) ? <div /> : (
        <LargeVideoHeader video={Video} user={User} />
    );
};

export default LargeVideoHeaderContainer;
