import React from 'react';
import { selectorStateType, useAppSelector } from '../../hooks';
import { videoAPISuccessReturnProp } from '../../library/api/video';
import LargeVideoHeader from '../../components/Video/LargeVideoHeader';

interface fromReducerType{
    Video: videoAPISuccessReturnProp|null
}

const LargeVideoHeaderContainer: React.FC = () => {
    const {
        Video,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        Video: state.videoReducer.video,
    }));
    if (Video === null) {
        return <div />;
    }
    return (
        <LargeVideoHeader video={Video.video} />
    );
};

export default LargeVideoHeaderContainer;
