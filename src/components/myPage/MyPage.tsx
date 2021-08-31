import React, { useEffect, useRef } from 'react';
import { AnyAction } from 'redux';
import VideoContainer from '../../containers/landing/VideoContainer';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/Video/video';
import './MyPage.scss';
import MyPageGraph from './MyPageGraph';

interface fromReducerType{
    user: authRouter.checkSuccessResponse|null
    video: videoRouter.userVideoSuccessResponse|null
}

const MyPage: React.FC = () => {
    const { videoUserUploaded }: videoModule.ActionType = videoAction;
    const canvasRef: React.RefObject<HTMLCanvasElement > = useRef(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        user,
        video,
    }: fromReducerType = useAppSelector((state: selectorStateType) => ({
        user: state.userReducer.user,
        video: state.videoReducer.videoUserUpload,
    }));
    useEffect(() => {
        if (user) {
            dispatch(videoUserUploaded({ uploader: user.userId }));
        }
    }, [dispatch, user, videoUserUploaded]);

    /* Object.entries(tagNum).map(([key, value]: [key:string, value : number]) => {
    }); */
    if (!user) return <div>로그인이 필요합니다.</div>;
    return (
        <div className="mypage">
            <div className="mypage__header">
                <div className="mypage__header__title">
                    <div className="mypage__header__title__name">
                        {user.nickname}
                        <div className="mypage__header__title__name__icons">
                            <div className="mypage__header__title__name__iconBackGround">
                                <img className="mypage__header__title__name__icon" src="/icons/chat-icon.png" alt="chat-icon" />
                            </div>
                            <div className="mypage__header__title__name__iconBackGround">
                                <img className="mypage__header__title__name__icon" src="/icons/chat-icon.png" alt="chat-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="mypage__header__title__description">
                        {user.email}
                    </div>
                </div>
                <MyPageGraph />
            </div>
            <hr className="mypage__horizenline" />
            <div className="mypage__videoGrid">
                {video && video.videos.map((videoInfo: VIDEO) => (
                    <VideoContainer videoInfo={videoInfo} />
                ))}
            </div>
        </div>
    );
};

export default MyPage;
