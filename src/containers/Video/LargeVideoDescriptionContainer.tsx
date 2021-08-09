import React from 'react';
import { selectorStateType, useAppSelector } from '../../hooks';
import { videoAPISuccessReturnProp } from '../../lib/api/video';
import LargeVideoDescription from '../../components/Video/LargeVideoDescription';

interface fromReducerType{
    Video: videoAPISuccessReturnProp|null
}

const LargeVideoDescriptionContainer: React.FC = () => {
    const {
        Video,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        Video: state.videoReducer.video,
    }));
    if (Video === null) {
        return <div />;
    }
    return (
        <LargeVideoDescription description={Video.video.discription} />
    );
};

export default LargeVideoDescriptionContainer;
