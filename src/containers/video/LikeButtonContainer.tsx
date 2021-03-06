import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import LikeButton from '../../components/video/LikeButton';
import { videoLike } from '../../api/video';

interface LikeResponse {
    success: VideoRouter.VideoLikeSuccessResponse | null
    failure: VideoRouter.VideoLikeFailureResponse | null
}
interface Props extends RouteComponentProps {
    video: VideoRouter.VideoSuccessResponse
}

const LikeButtonContainer: React.FC<Props> = ({ video, history }: Props) => {
    const [likeResponse, setLikeResponse]: [LikeResponse, React.Dispatch<React.SetStateAction<LikeResponse>>] = useState<LikeResponse>({ success: null, failure: null });
    const [toggle, setToggle]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const [ModalTrigger, setModalTrigger]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
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
            const response: AxiosResponse<VideoRouter.VideoLikeSuccessResponse> = await videoLike({ videoId: VIDEOID });
            setLikeResponse({ ...likeResponse, success: response });
            setToggle((prevState: boolean) => !prevState);
        }
        catch (err) {
            setModalTrigger(true);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 456) {
                        history.push('/BlockedUser');
                    }
                    setLikeResponse({ ...likeResponse, failure: err.response.data });
                }
            }
        }
    }, [history, likeResponse]);
    const onBackgroundClick: () => void = () => {
        setModalTrigger(false);
    };
    return (
        <LikeButton
            onButtonClick={() => onButtonClick(video.id)}
            toggle={toggle}
            onBackgroundClick={onBackgroundClick}
            ModalTrigger={ModalTrigger}
        />
    );
};

export default withRouter(LikeButtonContainer);
