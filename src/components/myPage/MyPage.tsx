import React from 'react';
import { Redirect } from 'react-router';
import VideoContainer from '../../containers/landing/VideoContainer';
import BlueButton from '../common/Button/BlueButton';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription/VideoDescription2';
import './MyPage.scss';
import MyPageGraph from './MyPageGraph';

export interface MyPageResponseType {
    success: UserRouter.MyPageSuccessResponse | null
    failure: UserRouter.MyPageFailureResponse | null
}
interface Props{
    myPageResponse: MyPageResponseType
    canModify: boolean
    user: User|null
    message: string
    toUploadPage: () => void
    toMainPage: () => void
    sendEmail: () => void
}

const MyPage: React.FC<Props> = ({ myPageResponse, canModify, toUploadPage, toMainPage, user, message, sendEmail }: Props) => (
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
                        myPageResponse.success && <MyPageGraph className="mypage__header__graph" tags={myPageResponse.success.tags} />
                    }

                </div>
                <hr className="mypage__horizenline" />
                {myPageResponse.success && myPageResponse.success.Video.length > 0
                && (
                    <div className="mypage__videoGrid">
                        {
                            myPageResponse.success.Video.map((videoInfo: Video) => (
                                <div key={videoInfo.id}>
                                    <VideoContainer videoInfo={videoInfo} />
                                    <VideoDescription2 videoInfo={videoInfo} />
                                </div>
                            ))
                        }
                    </div>
                )}
                {
                    canModify && myPageResponse.success && myPageResponse.success.Video.length === 0 && !(user && user.emailToken !== '')
                        && (
                            <div className="mypage__videoGrid__firstUpload">
                                <div className="mypage__videoGrid__firstUpload__text">
                                    <h2>동영상을 업로드하여 시작하기</h2>
                                    <br />
                                    <h3>본인이 편집한 동영상을 eedited에서 자랑해보세요!</h3>
                                </div>
                                <BlueButton onClick={toUploadPage}>업로드하기</BlueButton>
                            </div>
                        )
                }
                {
                    canModify && myPageResponse.success && myPageResponse.success.Video.length === 0 && user && user.emailToken !== ''
                        && (
                            <div className="mypage__videoGrid__firstUpload">
                                <div className="mypage__videoGrid__firstUpload__text">
                                    <h2>아직 이메일 확인이 완료되지 않았어요!</h2>
                                    <br />
                                    <h3>이메일을 확인하시고 eedited를 이용해 보세요!</h3>
                                    <br />
                                    <h3>이메일을 받지 못하셨나요?</h3>
                                </div>
                                <BlueButton onClick={sendEmail}>확인하기</BlueButton>
                                {message !== '' && <div>{message}</div>}
                            </div>
                        )
                }
                {
                    !canModify && myPageResponse.success && myPageResponse.success.Video.length === 0
                        && (
                            <div className="mypage__videoGrid__firstUpload">
                                <div className="mypage__videoGrid__firstUpload__text">
                                    <h2>아직 준비중입니다!</h2>
                                    <br />
                                </div>
                                <BlueButton onClick={toMainPage}>메인으로</BlueButton>
                            </div>
                        )
                }
            </div>
        )
);

export default MyPage;
