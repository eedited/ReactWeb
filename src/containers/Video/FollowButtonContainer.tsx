import { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import FollowButton from '../../components/Video/FollowButton';

import { userFollow } from '../../library/api/user';

interface FollowResponse{
    success: userRouter.userFollowSuccessResponse | null
    failure: userRouter.userFollowFailureResponse | null
}

interface Props{
    video: videoRouter.videoSuccessResponse
}
const FollowButtonContainer: React.FC<Props> = ({ video }: Props) => {
    const [followResponse, setfollowResponse]: [FollowResponse, React.Dispatch<React.SetStateAction<FollowResponse>>] = useState<FollowResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    useEffect(() => {
        setToggle(false);
        if (video) {
            if (video.User) {
                if (video.User.followTo) {
                    if (video.User.followTo.length > 0) {
                        setToggle(true);
                    }
                }
            }
        }
    }, [video]);
    const onButtonClick: (USERID: string) => Promise<void> = useCallback(async (USERID: string) => {
        setfollowResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<userRouter.userFollowResponse> = await userFollow({ userId: USERID });
            setfollowResponse({ ...followResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setfollowResponse({ ...followResponse, failure: err.response.data });
        }
    }, [followResponse]);
    return (
        <FollowButton onButtonClick={() => onButtonClick(video.uploader)} toggle={toggle} />
    );
};

export default FollowButtonContainer;
