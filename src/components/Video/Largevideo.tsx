import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import { VIDEO } from '../../lib/api/video';
import './Largevideo.scss';

interface props{
    onLoad: (player: ReactPlayer)=> void
    videoInfo: VIDEO
}
const LargeVideo: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, videoInfo,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => {
    if (videoInfo === null) {
        return <div>error</div>;
    }
    return (
        <div className="LargeVideo">
            <ReactPlayer
                className="video__player"
                url={videoInfo.url}
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
    );
});

export default React.memo(LargeVideo);
