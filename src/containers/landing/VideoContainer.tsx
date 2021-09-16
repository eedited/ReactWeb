import React, {
    useRef, useState, useCallback,
} from 'react';
import ReactPlayer from 'react-player';
import Video from '../../components/Landing/VideoGrid/Video';

interface props{
    videoInfo: VIDEO
    key?: string
}

const VideoContainer: React.FC<props> = ({ videoInfo, key }: props) => {
    const [isLoading, setisLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);
    const [mouseOver, setMouseOver]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const onLoad: (plyaer: ReactPlayer) => void = (player: ReactPlayer) => {
        setisLoading(false);
    };
    const onMouseOver: () => void = useCallback(() => {
        setMouseOver(true);
    }, []);
    const onMouseLeave: () => void = useCallback(() => {
        setMouseOver(false);
        setisLoading(true);
    }, []);
    return (
        <Video
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onLoad={onLoad}
            isLoading={isLoading}
            mouseOver={mouseOver}
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
