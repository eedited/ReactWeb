import React, { forwardRef } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Video.scss';

interface props {
    onLoad: (player: ReactPlayer) => void
    play: () => void
    pause: () => void
    setOpacity: () => number
    videoInfo: Video
    key: string|undefined
}
const Video: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, play, pause, setOpacity, videoInfo, key,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    <div className="videoElement" key={key}>
        <Link to={`/videoInfo?videoId=${videoInfo.id}`}>
            <div className="video">
                <ReactPlayer
                    className="video__player"
                    url={videoInfo.url}
                    ref={youtubeRef}
                    muted
                    width="100%"
                    height="100%"
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
                        opacity: setOpacity(),
                        borderRadius: '20px',
                    }}
                />
                <img
                    className="video__img"
                    src={videoInfo.thumbnail}
                    alt="123"
                    onMouseOver={play}
                    onFocus={play}
                    onMouseLeave={pause}
                    onBlur={pause}
                    style={{ opacity: (setOpacity() + 1) % 2 }}
                />
            </div>
        </Link>
    </div>
));

export default React.memo(Video);
