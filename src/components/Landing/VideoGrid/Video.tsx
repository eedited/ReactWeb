// TODO: 투명한 사각형을 하나 올려서 거지같은 유튜브 로고도 없앨 수 있을거 같고, 클랙했을 때, 마우스 올라왔을 때 등등의 이벤트도 몰아서 처리하면 될거 같음. 그런데 이게 이미지에 이벤트 핸들링 하는거랑 다를게 있는가? 는 좀 생각해 볼 필요가 있음.

import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import './Video.scss';

interface props{
    onLoad: (player: ReactPlayer)=> void
    play: ()=> void
    pause: ()=> void
    setOpacity: ()=> number
    thumbnailUrl: string
    videoUrl: string
}
const Video: React.ForwardRefExoticComponent<props & React.RefAttributes<ReactPlayer>> = forwardRef<ReactPlayer, props>(({
    onLoad, play, pause, setOpacity, thumbnailUrl, videoUrl,
}: props, youtubeRef: React.ForwardedRef<ReactPlayer>) => (
    <div className="video">
        <ReactPlayer
            className="video__player"
            url={videoUrl}
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
                opacity: setOpacity(),
            }}
        />
        <img
            className="video__img"
            src={thumbnailUrl}
            alt="123"
            onMouseOver={play}
            onFocus={play}
            onMouseLeave={pause}
            onBlur={pause}
            style={{ opacity: (setOpacity() + 1) % 2 }}
        />
    </div>
));

export default React.memo(Video);
