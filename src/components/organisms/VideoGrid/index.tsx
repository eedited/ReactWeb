import React from 'react';
import Video from '../../atoms/Video';
import VideoWithDescription from '../../molecules/VideoWithDescription';
import './VideoGrid.scss';

interface props{
    videoId: string,
    videoName: string,
    videoTitle: string,
    videoLike: string,
    videoSrc: string
}
const VideoGrid: React.FC = () => {
    const videoArray: props[] = [];
    for (let i: number = 0; i < 10; i += 1) {
        videoArray.push({
            videoId: 'nVuRO5SbphY',
            videoName: '공격수chef',
            videoTitle: '지리는 스테이크',
            videoLike: '1000',
            videoSrc: 'sungPA.jpg',
        });
    }
    return (
        <div className="VideoGrid">
            {videoArray.map((prop: props) => (
                <VideoWithDescription
                    videoId={prop.videoId}
                    videoName={prop.videoName}
                    videoTitle={prop.videoTitle}
                    videoLike={prop.videoLike}
                    videoSrc={prop.videoSrc}
                />
            ))}
        </div>
    );
};

export default VideoGrid;
