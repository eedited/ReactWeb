import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import UserMaybeLike from '../../components/video/UserMaybeLike';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/video';

interface FromReducerType {
    userMayBeLiekVideo: VideoRouter.UserVideoSuccessResponse | null
    user: AuthRouter.CheckSuccessResponse|null
}

const UserMaybeLikeContainer: React.FC = () => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        userMayBeLiekVideo,
        user,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        userMayBeLiekVideo: state.videoReducer.videoUserMayBeLikeSuccess,
        user: state.userReducer.user,
    }));
    useEffect(() => {
        dispatch(videoAction.videoUserMayBeLike({
            category: 'all',
            platform: 'all',
            program: 'all',
            sorting: 'thumbup',
            page: 1,
        }));
    }, [dispatch, user]);
    return userMayBeLiekVideo
        ? <UserMaybeLike videos={userMayBeLiekVideo.videos} />
        : <></>;
};

export default UserMaybeLikeContainer;
