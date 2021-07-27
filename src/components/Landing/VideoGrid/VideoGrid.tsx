import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import './VideoGrid.scss';

interface videoInfo{
    videoUrl: string,
    thumbnailUrl: string
}
interface props{
    videoInfos: videoInfo[]
}
const VideoGrid: React.FC<props> = ({ videoInfos }: props) => (
    <div className="videoGrid">
        {videoInfos.map((video: videoInfo, idx: number) => <VideoContainer key={Math.random()} videoUrl={video.videoUrl} thumbnailUrl={video.thumbnailUrl} />)}
    </div>
);

export default VideoGrid;
