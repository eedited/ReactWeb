import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import { VIDEO } from '../../../library/api/video';
import './VideoGrid.scss';

type videoInfo = VIDEO
interface props{
    videoInfos: VIDEO[]|null
}
const VideoGrid: React.FC<props> = ({ videoInfos }: props) => (

    <div className="videoGrid">
        {videoInfos === null
            ? <div>loading</div>
            : videoInfos.map((video: videoInfo, idx: number) => <VideoContainer key={video.id} videoInfo={video} />)}
    </div>
);

export default VideoGrid;
