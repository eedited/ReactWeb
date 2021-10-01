import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import UserMaybeLike from '../../components/Video/UserMaybeLike';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/Video';

interface FromReducerType {
    userMayBeLiekVideo: VideoRouter.UserVideoSuccessResponse | null
}

const UserMaybeLikeContainer: React.FC = () => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        userMayBeLiekVideo,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        userMayBeLiekVideo: state.videoReducer.videoUserMayBeLikeSuccess,
    }));
    useEffect(() => {
        dispatch(videoAction.videoUserMayBeLike({
            category: 'all',
            platform: 'all',
            program: 'all',
            sorting: 'thumbup',
            page: 1,
        }));
    }, [dispatch]);
    return userMayBeLiekVideo
        ? <UserMaybeLike videos={userMayBeLiekVideo.videos} />
        : <></>;
};

export default UserMaybeLikeContainer;
