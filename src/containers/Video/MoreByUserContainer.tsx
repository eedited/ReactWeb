// TODO : api 서버에 갯수 줄 수 있게 만들어서 동영상 가장 최신꺼 4개만 받아와서 video 배열 구성한 후, coponent에 배열 만들어둔걸로 넘기기.

import React, { useEffect } from 'react';
import { AnyAction } from 'redux';

import MoreByUser from '../../components/Video/MoreByUser';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';

interface fromReducerType{
    video: videoRouter.videoSuccessResponse|null
    userUploadedVideo: videoRouter.userVideoSuccessResponse|null
}
const MoreByUserContainer: React.FC = () => {
    const { videoUserUploaded }: videoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        video, userUploadedVideo,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        video: state.videoReducer.video,
        userUploadedVideo: state.videoReducer.videoUserUpload,
    }));
    useEffect(() => {
        if (video) {
            dispatch(videoUserUploaded({ uploader: video.uploader }));
        }
    }, [dispatch, video, videoUserUploaded]);

    if (userUploadedVideo === null) {
        return <div />;
    }
    return <MoreByUser videos={userUploadedVideo.videos.filter((Video: VIDEO) => Video.id !== video?.id)} />;
};

export default MoreByUserContainer;
