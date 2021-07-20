import React from 'react';
import './Description.scss';

const Description: React.FC = () => (
    <div className="landing__description">
        <div className="landing__description__text">
            <h1>title</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, magnam.</p>
        </div>
        <img className="landing__description__img" src="logo192.png" alt="description img" />
    </div>

);

export default Description;
