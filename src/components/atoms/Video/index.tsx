import React from 'react';
import './Video.scss';
import Youtube, { Options } from 'react-youtube';

interface props{
    videoId: string
}
type VideoType = React.FC<props>
const Video: VideoType = ({ videoId }: props) => {
    // const KEY: string = 'AIzaSyAwcosqWfNA1kYUxW0U0ECNWAAs_HvEKGI';
    // const ytPlayList: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&order=date&maxResults=10&&key=${KEY}`;
    const opts: Options = {
        width: '320',
        height: '180',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
        },
    };

    return (
        <Youtube videoId={videoId} opts={opts} />
    );
};

export default Video;
