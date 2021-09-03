import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import VideoContainer from '../../containers/landing/VideoContainer';
import { myPage } from '../../library/api/user';
import VideoDescription2 from '../Landing/VideoGrid/VideoDescription/VideoDescription2';
import './MyPage.scss';
import MyPageGraph from './MyPageGraph';

interface props{
    userId: string
}
interface myPageResponseType{
    success: userRouter.myPageSuccessResponse | null
    failure: userRouter.myPageFailureResponse | null
}
const MyPage: React.FC<props> = ({ userId }: props) => {
    const [myPageResponse, setMyPageResponse]: [myPageResponseType, React.Dispatch<React.SetStateAction<myPageResponseType>>] = useState<myPageResponseType>({ success: null, failure: null });

    useEffect(() => {
        async function fetchMyPage() {
            setMyPageResponse({ success: null, failure: null });
            try {
                const response: AxiosResponse<userRouter.myPageSuccessResponse> = await myPage({ userId });
                setMyPageResponse({ success: response.data, failure: null });
            }
            catch (err) {
                setMyPageResponse({ success: null, failure: err.response.data });
            }
        }
        fetchMyPage();
    }, [userId]);
    if (myPageResponse.failure) {
        return <div>{myPageResponse.failure.info}</div>;
    }
    if (myPageResponse.success === null) return <div>로딩중</div>;
    return (
        <div className="mypage">
            <div className="mypage__header">
                <div className="mypage__header__title">
                    <div className="mypage__header__title__name">
                        {myPageResponse.success.nickname}
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
                        {myPageResponse.success.email}
                    </div>
                </div>
                <MyPageGraph tags={myPageResponse.success.tags} />
            </div>
            <hr className="mypage__horizenline" />
            <div className="mypage__videoGrid">
                {myPageResponse.success.Video.map((videoInfo: VIDEO) => (
                    <div key={videoInfo.id}>
                        <VideoContainer videoInfo={videoInfo} />
                        <VideoDescription2 videoInfo={videoInfo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPage;
