import { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import FollowButton from '../../components/Video/FollowButton';
import { userFollow } from '../../api/user';

interface FollowResponse {
    success: UserRouter.UserFollowSuccessResponse | null
    failure: UserRouter.UserFollowFailureResponse | null
}
interface Props {
    video: VideoRouter.VideoSuccessResponse
}

const FollowButtonContainer: React.FC<Props> = ({ video }: Props) => {
    const [followResponse, setfollowResponse]: [FollowResponse, React.Dispatch<React.SetStateAction<FollowResponse>>] = useState<FollowResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

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
            setfollowResponse({ ...followResponse, failure: err.response.data });
        }
    }, [followResponse]);

    return <FollowButton onButtonClick={() => onButtonClick(video.uploader)} toggle={toggle} />;
};

export default FollowButtonContainer;
