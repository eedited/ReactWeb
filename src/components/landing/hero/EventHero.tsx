import React from 'react';
import './Hero.scss';

const EventHero: React.FC = () => (
    <div className="hero">
        <div className="hero__description">
            <p className="hero__description__title">
                개발자들과
                <br />
                이야기를 나눠보세요!!
            </p>
            <p className="hero__description__body">
                discord 시작하기
                <br />
                {' '}
                <a href="https://discord.gg/sMWzGfaHQK">https://discord.gg/sMWzGfaHQK</a>
            </p>
        </div>
        <img className="hero__img" alt="hero__img" src="/images/heros/heroImg.png" />
    </div>

);

export default EventHero;
