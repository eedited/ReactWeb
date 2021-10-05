import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { videoLike } from '../../api/video';
import LikeButtonCount from '../../components/Landing/VideoGrid/Buttons/LikeButtonCount';

interface LikeButtonStateType {
    toggle: boolean,
    likeCnt: number
}
interface Props {
    Video: Video | null
}
interface LikeResponse {
    success: VideoRouter.VideoLikeSuccessResponse | null
    failure: VideoRouter.VideoLikeFailureResponse | null
}
const LikeButtonCountContainer: React.FC<Props> = ({ Video }: Props) => {
    const [likeButtonState, toggleClickLikeButton]: [LikeButtonStateType, React.Dispatch<React.SetStateAction<LikeButtonStateType>>] = useState<LikeButtonStateType>({ toggle: false, likeCnt: Video ? Video.likeCnt : 0 });
    const [likeResponse, setLikeResponse]: [LikeResponse, React.Dispatch<React.SetStateAction<LikeResponse>>] = useState<LikeResponse>({ success: null, failure: null });
    const [ModalTrigger, setModalTrigger]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    useEffect(() => {
        toggleClickLikeButton({ toggle: false, likeCnt: Video ? Video.likeCnt : 0 });
        if (Video) {
            if (Video.WhatVideoUpload) {
                if (Video.WhatVideoUpload.length > 0) {
                    toggleClickLikeButton((prevState: LikeButtonStateType) => ({ ...prevState, toggle: true }));
                }
            }
        }
    }, [Video]);

    const onButtonClick: (VIDEOID: string) => void = useCallback(async (VIDEOID: string) => {
        setLikeResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<VideoRouter.VideoLikeSuccessResponse> = await videoLike({ videoId: VIDEOID });
            setLikeResponse({ ...likeResponse, success: response.data });
            if (likeButtonState.toggle) {
                toggleClickLikeButton({ toggle: !likeButtonState.toggle, likeCnt: likeButtonState.likeCnt - 1 });
            }
            else {
                toggleClickLikeButton({ toggle: !likeButtonState.toggle, likeCnt: likeButtonState.likeCnt + 1 });
            }
        }
        catch (err) {
            setModalTrigger(true);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setLikeResponse({ ...likeResponse, failure: err.response.data });
                }
            }
        }
    }, [likeButtonState.likeCnt, likeButtonState.toggle, likeResponse]);
    const onBackgroundClick: () => void = () => {
        setModalTrigger(false);
    };
    if (Video === null) return <div />;
    return (
        <LikeButtonCount
            likeButtonState={likeButtonState}
            onButtonClick={() => onButtonClick(Video.id)}
            onBackgroundClick={onBackgroundClick}
            ModalTrigger={ModalTrigger}
        />
    );
};

export default LikeButtonCountContainer;
