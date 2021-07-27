import React from 'react';
import VideoGrid from '../../components/Landing/VideoGrid/VideoGrid';

interface videoInfo{
    videoUrl: string,
    thumbnailUrl: string
}

const VideoGridContainer: React.FC = () => {
    const video: videoInfo[] = [
        {
            videoUrl: 'https://www.youtube.com/watch?v=ANi94cnR9VE',
            thumbnailUrl: 'https://img.youtube.com/vi/ANi94cnR9VE/mqdefault.jpg',
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=ANi94cnR9VE',
            thumbnailUrl: 'https://img.youtube.com/vi/ANi94cnR9VE/mqdefault.jpg',
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=ANi94cnR9VE',
            thumbnailUrl: 'https://img.youtube.com/vi/ANi94cnR9VE/mqdefault.jpg',
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=ANi94cnR9VE',
            thumbnailUrl: 'https://img.youtube.com/vi/ANi94cnR9VE/mqdefault.jpg',
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=ANi94cnR9VE',
            thumbnailUrl: 'https://img.youtube.com/vi/ANi94cnR9VE/mqdefault.jpg',
        },
    ];
    return (
        <VideoGrid videoInfos={video} />
    );
};

export default VideoGridContainer;
