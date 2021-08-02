import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';
import { rootActionType, rootStateType } from '../../modules';
import { videoList } from '../../modules/Video/video';
import { VIDEO, videoListAPISuccessReturnProp } from '../../lib/api/video';

interface fromReducerType{
    videos: videoListAPISuccessReturnProp|null
}
interface props{
    criteria: string
}
const VideoGridContainer: React.FC<props> = ({ criteria }: props) => {
    const [videoInfo, setVideoInfo]: [VIDEO[]|null, React.Dispatch<React.SetStateAction<VIDEO[]|null>>] = useState<VIDEO[]|null>(null);
    const dispatch: React.Dispatch<rootActionType> = useDispatch();
    const {
        videos,
    }: fromReducerType = useSelector(({ videoReducer }: rootStateType) => ({
        videos: videoReducer.videoList,
    }));
    useEffect(() => {
        dispatch((videoList({ criteria })));
    }, [criteria, dispatch]);
    useEffect(() => {
        if (videos) {
            setVideoInfo(videos.videos);
            console.log(videos);
        }
    }, [videos]);
    return (
        <VideoGrid videoInfos={videoInfo} />
    );
};

export default VideoGridContainer;
