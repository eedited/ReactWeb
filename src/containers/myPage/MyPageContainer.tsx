import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { myPage } from '../../library/api/user';
import MyPage, { myPageResponseType } from '../../components/myPage/MyPage';

interface props{
    userId: string
}

const MyPageContainer: React.FC<props> = ({ userId }: props) => {
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
    return (
        <MyPage myPageResponse={myPageResponse} />
    );
};

export default MyPageContainer;
