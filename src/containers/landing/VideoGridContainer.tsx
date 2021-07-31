import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';
import { rootActionType, rootStateType } from '../../modules';
import { videoSuccessType, viedoListSuccessType } from '../../modules/Video/videoType';
import { videoList } from '../../modules/Video/video';

interface fromReducerType{
    videos: viedoListSuccessType|null
}
interface videoInfoType{
    thumbnailUrl: string,
    videoUrl: string
}
interface props{
    criteria: string
}
const VideoGridContainer: React.FC<props> = ({ criteria }: props) => {
    const [videoInfo, setVideoInfo]: [videoInfoType[]|null, React.Dispatch<React.SetStateAction<videoInfoType[]|null>>] = useState<videoInfoType[]|null>(null);
    const dispatch: React.Dispatch<rootActionType> = useDispatch();
    const {
        videos,
    }: fromReducerType = useSelector(({ videoReducer }: rootStateType) => ({
        videos: videoReducer.videoList,
    }));
    useEffect(() => {
        dispatch((videoList({ criteria })));
        if (videos !== null) {
            setVideoInfo(videos.map((video: videoSuccessType) => ({
                thumbnailUrl: video.thumbnail,
                videoUrl: video.url,
            })));
        }
    }, [criteria, dispatch, videos]);
    return (
        <VideoGrid videoInfos={videoInfo} />
    );
};

export default VideoGridContainer;
