import React, { useRef, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import Video from '../../components/landing/videoGrid/Video';

interface Props {
    videoInfo: Video
    key?: string
}

const VideoContainer: React.FC<Props> = ({ videoInfo, key }: Props) => {
    const [isLoading, setisLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
    const [isPlay, setisPlay]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);

    const play: () => void = () => {
        if (!isLoading) {
            setisPlay(true);
            youtubeRef.current?.getInternalPlayer().playVideo();
        }
    };

    const pause: () => void = () => {
        if (!isLoading) {
            youtubeRef.current?.getInternalPlayer().stopVideo();
            setisPlay(false);
        }
    };

    const onLoad: (plyaer: ReactPlayer) => void = (player: ReactPlayer) => {
        setisLoading(false);
    };

    const setOpacity: () => number = useCallback(() => Number(!isLoading && isPlay), [isLoading, isPlay]);

    return (
        <Video
            onLoad={onLoad}
            play={play}
            pause={pause}
            setOpacity={setOpacity}
            videoInfo={videoInfo}
            ref={youtubeRef}
            key={key}
        />
    );
};

VideoContainer.defaultProps = {
    key: '',
};

export default React.memo(VideoContainer);
