import React from 'react';
import BaseTemplate from './BaseTemplate';
import Description from '../components/Landing/Description/Description';
import VideoGridContainer from '../containers/landing/VideoGridContainer';

const Landing: React.FC = () => (
    <BaseTemplate>
        <Description />
        <VideoGridContainer />
    </BaseTemplate>
);

export default Landing;
