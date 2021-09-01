import { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import LikeButton from '../../components/Video/LikeButton';

import { videoLike } from '../../library/api/video';

interface liekResponse{
    success: videoRouter.videoLikeSuccessResponse | null
    failure: videoRouter.videoLikeFailureResponse | null
}

interface Props{
    video: videoRouter.videoSuccessResponse
}
const LikeButtonContainer: React.FC<Props> = ({ video }: Props) => {
    const [likeResponse, setLikeResponse]: [liekResponse, React.Dispatch<React.SetStateAction<liekResponse>>] = useState<liekResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    useEffect(() => {
        setToggle(false);
        if (video) {
            if (video.WhatVideoUpload) {
                if (video.WhatVideoUpload.length > 0) {
                    setToggle(true);
                }
            }
        }
    }, [video]);
    const onButtonClick: (VIDEOID: string) => Promise<void> = useCallback(async (VIDEOID: string) => {
        setLikeResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<videoRouter.videoLikeSuccessResponse> = await videoLike({ videoId: VIDEOID });
            setLikeResponse({ ...likeResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setLikeResponse({ ...likeResponse, failure: err.response.data });
        }
    }, [likeResponse]);
    return (
        <LikeButton onButtonClick={() => onButtonClick(video.id)} toggle={toggle} />
    );
};

export default LikeButtonContainer;
