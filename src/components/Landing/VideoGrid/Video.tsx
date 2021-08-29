// TODO: 투명한 사각형을 하나 올려서 거지같은 유튜브 로고도 없앨 수 있을거 같고, 클랙했을 때, 마우스 올라왔을 때 등등의 이벤트도 몰아서 처리하면 될거 같음. 그런데 이게 이미지에 이벤트 핸들링 하는거랑 다를게 있는가? 는 좀 생각해 볼 필요가 있음.

import React, { forwardRef } from 'react';

import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Video.scss';

interface props{
    onLoad: (player: ReactPlayer) => void
    play: () => void
    pause: () => void
    setOpacity: () => number
    videoInfo: VIDEO
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
        <div className="video__title">{videoInfo.title}</div>
        <div className="video__detail">
            <div className="video__uploader">
                <div className="video__uploader__name">{videoInfo.nickname}</div>
                <div className="vidoe__uploader__follow">
                    {/* onClick함수 필요함. */}
                    <img className="video__uploader__follow__icon" src="/icons/follow-icon.png" alt="follow-icon" />
                    <div>
                        {' '}
                        팔로우
                    </div>

                </div>
            </div>
            <div className="video__detail__like">
                <img className="video__detail__like__icon" src="/icons/heart-icon--filled.png" alt="like-icon" />
                {' '}
                {videoInfo.likeCnt}
            </div>
        </div>
    </div>
));

export default React.memo(Video);
