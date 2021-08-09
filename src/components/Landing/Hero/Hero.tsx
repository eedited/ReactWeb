import React from 'react';
import './Hero.scss';

const Description: React.FC = () => (
    <div className="hero">
        <div className="hero__description">
            <p className="hero__description__title">
                내 영상을 위한
                <br />
                {' '}
                최고의 편집자들이
                <br />
                {' '}
                모두 여기에
            </p>
            <p>
                에디티드에서 능력자들의 포트폴리오를
                <br />
                {' '}
                한눈에 살펴보고 바로 소통해보세요!
            </p>
        </div>
        <img className="hero__img" alt="hero__img" src="/heroImg.png" />
    </div>

);

export default Description;
