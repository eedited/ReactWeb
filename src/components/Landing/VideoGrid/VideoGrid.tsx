import React from 'react';
import Video from './Video';
import './VideoGrid.scss';

const VideoGrid: React.FC = () => (
    <div className="videoGrid">
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
    </div>
);

export default VideoGrid;
