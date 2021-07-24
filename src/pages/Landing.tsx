import React from 'react';
import BaseTemplate from '../containers/BaseTemplate';
import Description from '../components/Landing/Description/Description';
import VideoGrid from '../components/Landing/VideoGrid/VideoGrid';

const Landing: React.FC = () => (
    <BaseTemplate>
        <Description />
        <VideoGrid />
    </BaseTemplate>
);

export default Landing;
