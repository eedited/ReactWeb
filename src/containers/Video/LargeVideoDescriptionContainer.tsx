import React from 'react';
import { selectorStateType, useAppSelector } from '../../hooks';
import { videoAPISuccessReturnProp } from '../../library/api/video';
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
    return Video !== null ? (<LargeVideoDescription description={Video.video.discription} />) : (<div />);
};

export default LargeVideoDescriptionContainer;
