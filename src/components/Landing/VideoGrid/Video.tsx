// TODO: 투명한 사각형을 하나 올려서 거지같은 유튜브 로고도 없앨 수 있을거 같고, 클랙했을 때, 마우스 올라왔을 때 등등의 이벤트도 몰아서 처리하면 될거 같음. 그런데 이게 이미지에 이벤트 핸들링 하는거랑 다를게 있는가? 는 좀 생각해 볼 필요가 있음.

import React, {
    useRef, useState,
} from 'react';
import ReactPlayer from 'react-player';
import './Video.scss';

const Video: React.FC = () => {
    const [isLoading, setisLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(true);
    const [isPlay, setisPlay]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);

    const play: ()=> void = () => {
        if (!isLoading) {
            setisPlay(true);
            youtubeRef.current?.getInternalPlayer().playVideo();
        }
    };

    const pause: ()=> void = () => {
        if (!isLoading) {
            youtubeRef.current?.getInternalPlayer().stopVideo();
            setisPlay(false);
        }
    };
    const onLoad: (plyaer: ReactPlayer)=> void = (player: ReactPlayer) => {
        setisLoading(false);
    };

    return (
        <div className="video">
            <ReactPlayer
                className="video__player"
                url="https://www.youtube.com/watch?v=wcsVjmHrUQg"
                ref={youtubeRef}
                muted
                width="480px"
                height="270px"
                onReady={onLoad}
                config={{
                    youtube: {
                        playerVars: {
                            rel: 0,
                            origin: 'http://localhost:3000',
                        },
                    },
                }}
                style={{
                    opacity: Number(!isLoading && isPlay),
                }}
            />
            <img
                className="video__img"
                src="https://img.youtube.com/vi/wcsVjmHrUQg/mqdefault.jpg"
                alt="123"
                onMouseOver={play}
                onFocus={play}
                onMouseLeave={pause}
                onBlur={pause}
                style={{ opacity: Number(isLoading || !isPlay) }}
            />
        </div>
    );
};

export default React.memo(Video);
