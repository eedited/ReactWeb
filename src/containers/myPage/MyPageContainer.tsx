import { AxiosResponse } from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { signupEmail } from '../../api/auth';
import { myPage } from '../../api/user';
import MyPage, { MyPageResponseType } from '../../components/myPage/MyPage';
import { SelectorStateType, useAppSelector } from '../../hooks';

interface Props extends RouteComponentProps {
    userId: string
}
interface FromReducerType {
    user: User|null
}
interface ValidateResponse {
    success: AuthRouter.SignupValidationSuccessResponse | null
    failure: Error | null
}

const MyPageContainer: React.FC<Props> = ({ userId, history }: Props) => {
    const [myPageResponse, setMyPageResponse]: [MyPageResponseType, React.Dispatch<React.SetStateAction<MyPageResponseType>>] = useState<MyPageResponseType>({ success: null, failure: null });
    const [canModify, setCanModify]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [followToggle, setFollowToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [validateResponse, setValidateResponse]: [ValidateResponse, React.Dispatch<React.SetStateAction<ValidateResponse>>] = useState<ValidateResponse>({ success: null, failure: null });
    const [message, setMessage]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');

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
                console.log(response.data);
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
    useEffect(() => {
        if (myPageResponse.success
            && myPageResponse.success.followTo
            && myPageResponse.success.followTo.length > 0) {
            setFollowToggle(true);
        }
    }, [myPageResponse.success]);
    const toUploadPage: () => void = useCallback(() => {
        history.push('/upload');
    }, [history]);
    const toMainPage: () => void = useCallback(() => {
        history.push('/');
    }, [history]);
    const toModifyPage: () => void = useCallback(() => {
        if (!user) {
            alert('잘못된 접근입니다.');
        }
        else history.push('/AccountSetting');
    }, [history, user]);
    const sendEmail: () => void = useCallback(async () => {
        setValidateResponse({ success: null, failure: null });
        setMessage('');
        try {
            const response: AxiosResponse<AuthRouter.SignupEmailSuccessResponse> = await signupEmail();
            setValidateResponse({ success: response, failure: null });
            setMessage('이메일이 발송되었습니다.');
        }
        catch (e) {
            setValidateResponse({ success: null, failure: e as Error });
            setMessage('이메일 발송 중 오류가 발생했습니다.');
        }
    }, []);
    return <MyPage myPageResponse={myPageResponse} canModify={canModify} toUploadPage={toUploadPage} toMainPage={toMainPage} user={user} message={message} sendEmail={sendEmail} toModifyPage={toModifyPage} followToggle={followToggle} />;
};

export default withRouter(MyPageContainer);
