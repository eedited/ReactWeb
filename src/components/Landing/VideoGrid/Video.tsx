import React, {
    useRef, useState,
} from 'react';
import ReactPlayer from 'react-player';
import './Video.scss';

const Video: React.FC = () => {
    const isLoading: React.MutableRefObject<boolean> = useRef(true);
    const [isPlay, setisPlay]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const youtubeRef: React.RefObject<ReactPlayer> = useRef<ReactPlayer>(null);

    const play: ()=> void = () => {
        if (isLoading.current === false) {
            setisPlay(true);
            youtubeRef.current?.getInternalPlayer().playVideo();
        }
    };

    const pause: ()=> void = () => {
        if (isLoading.current === false) {
            youtubeRef.current?.getInternalPlayer().stopVideo();
            setisPlay(false);
        }
    };

    const onLoad: (plyaer: ReactPlayer)=> void = (player: ReactPlayer) => {
        isLoading.current = false;
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
                onMouseOver={play}
                onMouseLeave={pause}
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
                    opacity: Number(!isLoading.current && isPlay),
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
                style={{ opacity: Number(isLoading.current || !isPlay) }}
            />
        </div>
    );
};

export default Video;
