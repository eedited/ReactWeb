import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import { VIDEO } from '../../library/api/video';
import './Largevideo.scss';

interface props{
    onLoad: (player: ReactPlayer)=> void
    videoInfo: VIDEO
    setOpacity: ()=> number
}
const LargeVideo: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, videoInfo, setOpacity,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => {
    if (videoInfo === null) {
        return <div>error</div>;
    }
    return (
        <div className="largeVideo">
            <ReactPlayer
                className="largeVideo__player"
                url={videoInfo.url}
                ref={youtubeRef}
                width="100%"
                height="34.3125vw"
                controls
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
                    opacity: (setOpacity()),
                    zIndex: setOpacity(),
                }}
            />
            <img
                className="largeVideo__img"
                src={videoInfo.thumbnail}
                alt="123"
                style={{
                    opacity: (setOpacity() + 1) % 2,
                    zIndex: (setOpacity() + 1) % 2,
                }}
            />
        </div>
    );
});

export default React.memo(LargeVideo);
