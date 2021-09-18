import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AnyAction } from 'redux';
import LargeVideo from '../../components/video/LargeVideo';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { videoAction } from '../../redux/video/video';

interface FromReducerType {
    Video: VideoRouter.VideoSuccessResponse | null
}
interface Props extends RouteComponentProps {
    videoId: string
}

const LargeVideoContainer: React.FC<Props> = ({ history, videoId }: Props) => {
    const { video, videoClear }: RDXVideoModule.ActionType = videoAction;
    const [isLoading, setisLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const { Video }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        Video: state.videoReducer.video,
    }));

    useEffect(() => {
        dispatch(videoClear());
    }, [dispatch, videoClear]);

    useEffect(() => {
        dispatch(video({ videoId }));
    }, [dispatch, video, videoId]);

    const onLoad: (plyaer: ReactPlayer) => void = (player: ReactPlayer) => {
        setisLoading(false);
    };

    const setOpacity: () => number = useCallback(() => Number(!isLoading), [isLoading]);

    return (
        <div>
            {
                Video === null
                    ? <div />
                    : (
                        <LargeVideo
                            onLoad={onLoad}
                            videoInfo={Video}
                            ref={youtubeRef}
                            setOpacity={setOpacity}
                        />
                    )
            }
        </div>
    );
};

export default withRouter(LargeVideoContainer);
