import React from 'react';
import { SelectorStateType, useAppSelector } from '../../hooks';

import LargeVideoDescription from '../../components/Video/LargeVideoDescription';

interface FromReducerType {
    Video: VideoRouter.VideoSuccessResponse | null
}

const LargeVideoDescriptionContainer: React.FC = () => {
    const {
        Video,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        Video: state.videoReducer.video,
    }));
    return Video !== null ? (<LargeVideoDescription description={Video.discription} tags={Video.WhatVideoUploadTag} />) : (<div />);
};

export default LargeVideoDescriptionContainer;
