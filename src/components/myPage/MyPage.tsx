import React from 'react';
import { Redirect } from 'react-router';
import VideoContainer from '../../containers/landing/VideoContainer';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription/VideoDescription2';
import './MyPage.scss';
import MyPageGraph from './MyPageGraph';

export interface MyPageResponseType {
    success: UserRouter.MyPageSuccessResponse | null
    failure: UserRouter.MyPageFailureResponse | null
}
interface Props {
    myPageResponse: MyPageResponseType
}

const MyPage: React.FC<Props> = ({ myPageResponse }: Props) => (
    myPageResponse.failure
        ? <Redirect to="404NotFound" />
        : (
            <div className="mypage">
                <div className="mypage__header">
                    <div className="mypage__header__title">
                        <div className="mypage__header__title__name">
                            {myPageResponse.success && myPageResponse.success.nickname}
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
                            {myPageResponse.success && myPageResponse.success.email}
                        </div>
                    </div>
                    {
                        myPageResponse.success && <MyPageGraph tags={myPageResponse.success.tags} />
                    }

                </div>
                <hr className="mypage__horizenline" />
                <div className="mypage__videoGrid">
                    {
                        myPageResponse.success && myPageResponse.success.Video.map((videoInfo: Video) => (
                            <div key={videoInfo.id}>
                                <VideoContainer videoInfo={videoInfo} />
                                <VideoDescription2 videoInfo={videoInfo} />
                            </div>
                        ))
                    }

                </div>
            </div>
        )
);

export default MyPage;
