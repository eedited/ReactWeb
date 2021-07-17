import React from 'react';
import Description from '../../components/molecules/Description';
import VideoGrid from '../../components/organisms/VideoGrid';
import Navbar from '../../components/organisms/Navbar';
import Footer from '../../components/organisms/Footer';

const Landing: ()=> JSX.Element = () => (
    <div>
        <Navbar />
        <Description />
        <hr />
        <div>필터가 위치할 자리</div>
        <hr />
        <VideoGrid />
        <hr />
        <Footer />
    </div>
);

export default Landing;
