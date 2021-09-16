import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Video.scss';

interface props{
    onLoad: (player: ReactPlayer) => void
    mouseOver: boolean
    onMouseOver: () => void
    onMouseLeave: () => void
    videoInfo: VIDEO
    key: string|undefined
    isLoading: boolean
}
const Video: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, videoInfo, key, mouseOver, onMouseOver, isLoading, onMouseLeave,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    <div className="videoElement" key={key}>
        <Link to={`/videoInfo?videoId=${videoInfo.id}`}>
            <div
                className="video"
                onMouseEnter={onMouseOver}
                onMouseLeave={onMouseLeave}
            >
                <img
                    className="video__img"
                    src={videoInfo.thumbnail}
                    alt="123"
                    style={{ opacity: !isLoading && mouseOver ? 0 : 1, zIndex: 2 }}
                />
                {
                    mouseOver && (
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
                            playing
                        />
                    )
                }
            </div>
        </Link>
    </div>
));

export default React.memo(Video);
