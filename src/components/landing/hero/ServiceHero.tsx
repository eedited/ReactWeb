import React from 'react';
import './Hero.scss';

const ServiceHero: React.FC = () => (
    <div className="hero">
        <div className="hero__description">
            <p className="hero__description__title">
                베타서비스 기간
                <br />
            </p>
            <p className="hero__description__body">
                베타서비스 기간
                <br />
                {' '}
                ~2021.11.21
                <br />
                <br />
                {' '}
                정식 서비스 출시 예정
                <br />
                {' '}
                2021.11.23~
            </p>
        </div>
        <img className="hero__img" alt="hero__img" src="/images/heros/deadline.png" />
    </div>

);

export default ServiceHero;
