import { AxiosResponse } from 'axios';
import { useCallback } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { myPage } from '../../api/user';
import MyPage, { MyPageResponseType } from '../../components/myPage/MyPage';
import { SelectorStateType, useAppSelector } from '../../hooks';

interface Props extends RouteComponentProps {
    userId: string
}
interface FromReducerType {
    user: User|null
}
const MyPageContainer: React.FC<Props> = ({ userId, history }: Props) => {
    const [myPageResponse, setMyPageResponse]: [MyPageResponseType, React.Dispatch<React.SetStateAction<MyPageResponseType>>] = useState<MyPageResponseType>({ success: null, failure: null });
    const [canModify, setCanModify]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const {
        user,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        user: state.userReducer.user,
    }));
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
    useEffect(() => {
        if (myPageResponse.success
             && user
              && user.userId === myPageResponse.success.userId) {
            setCanModify(true);
        }
    }, [myPageResponse.success, user]);
    const toUploadPage: () => void = () => {
        history.push('/upload');
    };
    const toMainPage: () => void = () => {
        history.push('/');
    };
    return <MyPage myPageResponse={myPageResponse} canModify={canModify} toUploadPage={toUploadPage} toMainPage={toMainPage} />;
};

export default withRouter(MyPageContainer);
