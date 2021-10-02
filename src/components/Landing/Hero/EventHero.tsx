import React from 'react';
import './Hero.scss';

const EventHero: React.FC = () => (
    <div className="hero">
        <div className="hero__description">
            <p className="hero__description__title">
                이벤트
                <br />
                진행중!!
            </p>
            <p className="hero__description__body">
                에디티드에서 능력자들의 포트폴리오를
                <br />
                {' '}
                한눈에 살펴보고 바로 소통해보세요!
            </p>
        </div>
        <img className="hero__img" alt="hero__img" src="/images/heros/heroImg.png" />
    </div>

);

export default EventHero;
