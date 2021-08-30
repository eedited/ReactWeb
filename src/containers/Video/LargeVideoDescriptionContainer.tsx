import React from 'react';
import { selectorStateType, useAppSelector } from '../../hooks';

import LargeVideoDescription from '../../components/Video/LargeVideoDescription';

interface fromReducerType{
    Video: videoRouter.videoSuccessResponse|null
}

const LargeVideoDescriptionContainer: React.FC = () => {
    const {
        Video,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        Video: state.videoReducer.video,
    }));
    return Video !== null ? (<LargeVideoDescription description={Video.discription} tags={Video.WhatVideoUploadTag} />) : (<div />);
};

export default LargeVideoDescriptionContainer;
