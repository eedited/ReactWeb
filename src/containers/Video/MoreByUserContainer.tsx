// TODO : api 서버에 갯수 줄 수 있게 만들어서 동영상 가장 최신꺼 4개만 받아와서 video 배열 구성한 후, coponent에 배열 만들어둔걸로 넘기기.

import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { VIDEO, videoAPISuccessReturnProp, videoListAPISuccessReturnProp } from '../../library/api/video';
import MoreByUser from '../../components/Video/MoreByUser';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';
import { videoActionType } from '../../redux/Video/videoType';

interface fromReducerType{
    video: videoAPISuccessReturnProp|null
    userUploadedVideo: videoListAPISuccessReturnProp|null
}
const MoreByUserContainer: React.FC = () => {
    const { videoUserUploaded }: videoActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        video, userUploadedVideo,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        video: state.videoReducer.video,
        userUploadedVideo: state.videoReducer.videoUserUpload,
    }));
    useEffect(() => {
        if (video) {
            dispatch(videoUserUploaded({ uploader: video.video.uploader }));
        }
    }, [dispatch, video, videoUserUploaded]);

    if (userUploadedVideo === null) {
        return <div />;
    }
    return <MoreByUser videos={userUploadedVideo.videos.filter((Video: VIDEO) => Video.id !== video?.video.id)} />;
};

export default MoreByUserContainer;
