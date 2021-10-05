import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import VideoDescription1 from './VideoDescription/VideoDescription1';
import './VideoGrid.scss';

type VideoInfo = Video
interface Props {
    videoList: Video[]
}

const VideoGrid: React.FC<Props> = ({ videoList }: Props) => (
    <div className="videoGrid">
        {videoList && videoList.map((video: VideoInfo, idx: number) => (
            <div key={video.id}>
                <VideoContainer videoInfo={video} />
                <VideoDescription1 videoInfo={video} />
            </div>
        ))}
    </div>
);

export default VideoGrid;
