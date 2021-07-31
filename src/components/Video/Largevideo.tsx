import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import './Largevideo.scss';

interface props{
    onLoad: (player: ReactPlayer)=> void
    thumbnailUrl: string
    videoUrl: string
}
const LargeVideo: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, thumbnailUrl, videoUrl,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    <div className="video">
        <ReactPlayer
            className="video__player"
            url={videoUrl}
            ref={youtubeRef}
            width="1280px"
            height="720px"
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
            }}
        />
    </div>
));

export default React.memo(LargeVideo);
