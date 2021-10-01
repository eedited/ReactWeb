import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import MoreByUser from '../../components/Video/MoreByUser';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/Video';

interface FromReducerType {
    video: VideoRouter.VideoSuccessResponse | null
    userUploadedVideo: VideoRouter.UserVideoSuccessResponse | null
}

const MoreByUserContainer: React.FC = () => {
    const { videoUserUploaded }: RDXVideoModule.ActionType = videoAction;
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        video, userUploadedVideo,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        video: state.videoReducer.video,
        userUploadedVideo: state.videoReducer.videoUserUpload,
    }));

    useEffect(() => {
        if (video) {
            dispatch(videoUserUploaded({ uploader: video.uploader }));
        }
    }, [dispatch, video, videoUserUploaded]);

    return userUploadedVideo === null
        ? <div />
        : <MoreByUser videos={userUploadedVideo.videos.filter((Video: Video) => Video.id !== video?.id)} />;
};

export default MoreByUserContainer;
