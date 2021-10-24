import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { RouteComponentProps, withRouter } from 'react-router';
import FollowButton from '../../components/video/FollowButton';
import { userFollow } from '../../api/user';

interface Props extends RouteComponentProps {
    mypage: UserRouter.MyPageSuccessResponse
    userId: string | null
}
interface FollowResponse {
    success: UserRouter.UserFollowSuccessResponse | null
    failure: UserRouter.UserFollowFailureResponse | null
}
const MyPageFollowContainer: React.FC<Props> = ({
    mypage, userId, history,
}: Props) => {
    const [followResponse, setfollowResponse]: [FollowResponse, React.Dispatch<React.SetStateAction<FollowResponse>>] = React.useState<FollowResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState<boolean>(false);
    const [ModalTrigger, setModalTrigger]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState<boolean>(false);
    React.useEffect(() => {
        setToggle(false);
        if (mypage && mypage.followTo && mypage.followTo.length > 0) {
            setToggle(true);
        }
    }, [mypage]);
    const onButtonClick: (USERID: string) => Promise<void> = React.useCallback(async (USERID: string) => {
        setfollowResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<UserRouter.UserFollowResponse> = await userFollow({ userId: USERID });
            setfollowResponse({ ...followResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setModalTrigger(true);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 456) {
                        history.push('/BlockedUser');
                    }
                    setfollowResponse({ ...followResponse, failure: err.response.data });
                }
            }
        }
    }, [followResponse, history]);
    const onBackgroundClick: () => void = () => {
        setModalTrigger(false);
    };
    return (
        userId === mypage.userId
            ? <></>
            : (
                <FollowButton
                    onButtonClick={() => onButtonClick(mypage.userId)}
                    toggle={toggle}
                    onBackgroundClick={onBackgroundClick}
                    ModalTrigger={ModalTrigger}
                />
            )
    );
};

export default withRouter(MyPageFollowContainer);
