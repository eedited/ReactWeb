import React from 'react';
import './HeroDescription.scss';

const HeroDescription: React.FC = () => (
    <div className="jobHero">
        <div className="jobHero__description">
            <p className="jobHero__description__title">
                인재찾기
            </p>
            <p className="jobHero__description__body">
                수많은 에디터들의 포트폴리오를 한 눈에 살펴보고
                <br />
                {' '}
                나에게 맞는 스타일의 에디터를 찾아보세요.
            </p>
        </div>
        <img className="jobHero__img" alt="hero__img" src="/heroImg.png" />
    </div>

);

export default HeroDescription;
