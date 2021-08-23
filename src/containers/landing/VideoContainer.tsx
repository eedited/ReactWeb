// TODO: 투명한 사각형을 하나 올려서 거지같은 유튜브 로고도 없앨 수 있을거 같고, 클랙했을 때, 마우스 올라왔을 때 등등의 이벤트도 몰아서 처리하면 될거 같음. 그런데 이게 이미지에 이벤트 핸들링 하는거랑 다를게 있는가? 는 좀 생각해 볼 필요가 있음.

import React, {
    useRef, useState, useCallback,
} from 'react';
import ReactPlayer from 'react-player';
import Video from '../../components/Landing/VideoGrid/Video';
import { VIDEO } from '../../lib/api/video';

interface props{
    videoInfo: VIDEO
}

const VideoContainer: React.FC<props> = ({ videoInfo }: props) => {
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
        />
    );
};

export default React.memo(VideoContainer);
