import React from 'react';
import './HeroDescription.scss';

const HeroDescription: React.FC = () => (
    <div className="hero">
        <div className="hero__description">
            <p className="hero__description__title">
                인재찾기
            </p>
            <p>
                수많은 에디터들의 포트폴리오를 한 눈에 살펴보고
                <br />
                {' '}
                나에게 맞는 스타일의 에디터를 찾아보세요.
            </p>
        </div>
        <img className="hero__img" alt="hero__img" src="/heroImg.png" />
    </div>

);

export default HeroDescription;
