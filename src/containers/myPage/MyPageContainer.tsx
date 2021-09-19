import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { myPage } from '../../api/user';
import MyPage, { MyPageResponseType } from '../../components/myPage/MyPage';

interface Props {
    userId: string
}

const MyPageContainer: React.FC<Props> = ({ userId }: Props) => {
    const [myPageResponse, setMyPageResponse]: [MyPageResponseType, React.Dispatch<React.SetStateAction<MyPageResponseType>>] = useState<MyPageResponseType>({ success: null, failure: null });

    useEffect(() => {
        async function fetchMyPage() {
            setMyPageResponse({ success: null, failure: null });
            try {
                const response: AxiosResponse<UserRouter.MyPageSuccessResponse> = await myPage({ userId });
                setMyPageResponse({ success: response.data, failure: null });
            }
            catch (err) {
                setMyPageResponse({ success: null, failure: err.response.data });
            }
        }
        fetchMyPage();
    }, [userId]);

    return <MyPage myPageResponse={myPageResponse} />;
};

export default MyPageContainer;
