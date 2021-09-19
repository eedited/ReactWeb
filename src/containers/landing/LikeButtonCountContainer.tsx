import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { videoLike } from '../../library/api/video';
import LikeButtonCount from '../../components/Landing/VideoGrid/Buttons/LikeButtonCount';

interface likeButtonStateType{
    toggle: boolean,
    likeCnt: number
}
interface props{
    Video: VIDEO|null
}
interface liekResponse{
    success: videoRouter.videoLikeSuccessResponse | null
    failure: videoRouter.videoLikeFailureResponse | null
}
const LikeButtonCountContainer: React.FC<props> = ({ Video }: props) => {
    const [likeButtonState, toggleClickLikeButton]: [likeButtonStateType, React.Dispatch<React.SetStateAction<likeButtonStateType>>] = useState<likeButtonStateType>({ toggle: false, likeCnt: Video ? Video.likeCnt : 0 });
    const [likeResponse, setLikeResponse]: [liekResponse, React.Dispatch<React.SetStateAction<liekResponse>>] = useState<liekResponse>({ success: null, failure: null });
    const [ModalTrigger, setModalTrigger]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    useEffect(() => {
        toggleClickLikeButton({ toggle: false, likeCnt: Video ? Video.likeCnt : 0 });
        if (Video) {
            if (Video.WhatVideoUpload) {
                if (Video.WhatVideoUpload.length > 0) {
                    toggleClickLikeButton((prevState: likeButtonStateType) => ({ ...prevState, toggle: true }));
                }
            }
        }
    }, [Video]);
    const onButtonClick: (VIDEOID: string) => void = useCallback(async (VIDEOID: string) => {
        setLikeResponse({ success: null, failure: null });
        try {
            const response: AxiosResponse<videoRouter.videoLikeSuccessResponse> = await videoLike({ videoId: VIDEOID });
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
            setLikeResponse({ ...likeResponse, failure: err.response.data });
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
