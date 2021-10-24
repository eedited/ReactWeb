import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import FollowButton from '../../components/video/FollowButton';
import { userFollow } from '../../api/user';

interface FollowResponse {
    success: UserRouter.UserFollowSuccessResponse | null
    failure: UserRouter.UserFollowFailureResponse | null
}
interface Props extends RouteComponentProps {
    video: VideoRouter.VideoSuccessResponse
    userId: string|null
}

const FollowButtonContainer: React.FC<Props> = ({ video, userId, history }: Props) => {
    const [followResponse, setfollowResponse]: [FollowResponse, React.Dispatch<React.SetStateAction<FollowResponse>>] = useState<FollowResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [ModalTrigger, setModalTrigger]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    useEffect(() => {
        setToggle(false);
        if (video.User.followTo && video.User.followTo.length > 0) {
            setToggle(true);
        }
    }, [video]);

    const onButtonClick: (USERID: string) => Promise<void> = useCallback(async (USERID: string) => {
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
        userId === video.uploader
            ? <></>
            : (
                <FollowButton
                    onButtonClick={() => onButtonClick(video.uploader)}
                    toggle={toggle}
                    onBackgroundClick={onBackgroundClick}
                    ModalTrigger={ModalTrigger}
                />
            )
    );
};

export default withRouter(FollowButtonContainer);
