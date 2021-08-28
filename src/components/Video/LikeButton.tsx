import { AxiosResponse } from 'axios';
import React, { useCallback, useState, useRef, useEffect } from 'react';

import { videoLike } from '../../library/api/video';
import './LikeButton.scss';

interface liekResponse{
    success: videoRouter.videoLikeSuccessResponse | null
    failure: videoRouter.videoLikeFailureResponse | null
}

interface Props{
    video: videoRouter.videoSuccessResponse
}
const LikeButton: React.FC<Props> = ({ video }: Props) => {
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

    const onButtonClick: (VIDEOID: string) => void = useCallback(async (VIDEOID: string) => {
        setLikeResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<videoRouter.videoLikeResponse> = await videoLike({ videoId: VIDEOID });
            setLikeResponse({ ...likeResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setLikeResponse({ ...likeResponse, failure: err.response.data });
        }
    }, [likeResponse]);
    return (
        <button className="likeButton" onClick={() => onButtonClick(video.id)} type="button">
            {!toggle
                ? <img className="likeButton__img" src="/icons/heart-icon2.png" alt="like" />
                : <img className="likeButton__img" src="/icons/heart-icon--filled.png" alt="like" />}
        </button>
    );
};

export default LikeButton;
