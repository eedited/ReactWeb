import React from 'react';
import VideoContainer from '../../../containers/landing/VideoContainer';
import VideoDescription1 from './VideoDescription/VideoDescription1';
import './VideoGrid.scss';

type videoInfo = VIDEO
interface props{
    videoInfos: VIDEO[]|null
}
const VideoGrid: React.FC<props> = ({ videoInfos }: props) => (

    <div className="videoGrid">
        {videoInfos === null
            ? <div>loading</div>
            : videoInfos.map((video: videoInfo, idx: number) => (
                <div key={video.id}>
                    <VideoContainer videoInfo={video} />
                    <VideoDescription1 videoInfo={video} />
                </div>
            ))}
    </div>
);

export default VideoGrid;
