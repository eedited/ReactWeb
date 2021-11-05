import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { signupEmail } from '../../api/auth';
import { myPage } from '../../api/user';
import MyPage, { MyPageResponseType } from '../../components/myPage/MyPage';
import { SelectorStateType, useAppSelector } from '../../hooks';

interface Props extends RouteComponentProps {
    userId: string
}
interface FromReducerType {
    user: AuthRouter.CheckSuccessResponse|null
}
interface ValidateResponse {
    success: AuthRouter.SignupValidationSuccessResponse | null
    failure: Error | null
}

const MyPageContainer: React.FC<Props> = ({ userId, history, location }: Props) => {
    const [myPageResponse, setMyPageResponse]: [MyPageResponseType, React.Dispatch<React.SetStateAction<MyPageResponseType>>] = useState<MyPageResponseType>({ success: null, failure: null });
    const [canModify, setCanModify]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [followToggle, setFollowToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [validateResponse, setValidateResponse]: [ValidateResponse, React.Dispatch<React.SetStateAction<ValidateResponse>>] = useState<ValidateResponse>({ success: null, failure: null });
    const [message, setMessage]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');
    const [loadingEmail, setLoadingEmail]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [toggleWindow, setToggleWindow]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [menuState, setMenuState]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('uploadVideos');
    const menu: (event: React.MouseEvent<HTMLButtonElement>) => void = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuState(event.currentTarget.name);
    };
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
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setMyPageResponse({ success: null, failure: err.response.data });
                    }
                }
            }
        }
        fetchMyPage();
    }, [userId, user, menuState]);
    useEffect(() => {
        setCanModify(false);
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
    useEffect(() => {
        if (toggleWindow) {
            const clear: NodeJS.Timeout = setTimeout(() => {
                setToggleWindow(false);
            }, 1000);
            return () => {
                clearInterval(clear);
            };
        }
        return () => {
            /**/
        };
    }, [toggleWindow]);
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
    const downloadPDF: () => void = useCallback(() => {
        const input: HTMLElement | null = document.getElementById('root');
        if (!input) return;
        html2canvas(input, { useCORS: true, allowTaint: true }).then((canvas: HTMLCanvasElement|null) => {
            if (!canvas) return;
            const imgData: string = canvas.toDataURL();
            const imgWidth: number = 210; // A4 width
            const pageHeight: number = imgWidth * 1.414;
            const imgHeight: number = (canvas.height * imgWidth) / canvas.width;
            let heightLeft: number = imgHeight;
            let position: number = 0;
            // eslint-disable-next-line new-cap
            const pdf: jsPDF = new jsPDF('p', 'mm');

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('download.pdf');
            heightLeft -= pageHeight;
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
        });
    }, []);
    const sendEmail: () => void = useCallback(async () => {
        setValidateResponse({ success: null, failure: null });
        setLoadingEmail(true);
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
        setLoadingEmail(false);
    }, []);
    const doCopy: () => void = () => {
    // 흐름 1.
        if (myPageResponse.success) {
            navigator.clipboard.writeText(`${window.location.origin}/portfolio/${myPageResponse.success.userId}`).then(() => {
                setToggleWindow(true);
            }).catch(() => {
                alert('복사 실패!');
            });
        }
    };
    return <MyPage myPageResponse={myPageResponse} canModify={canModify} toUploadPage={toUploadPage} toMainPage={toMainPage} user={user} message={message} sendEmail={sendEmail} toModifyPage={toModifyPage} followToggle={followToggle} loadingEmail={loadingEmail} doCopy={doCopy} toggleWindow={toggleWindow} downloadPDF={downloadPDF} menu={menu} menuState={menuState} />;
};

export default withRouter(MyPageContainer);
