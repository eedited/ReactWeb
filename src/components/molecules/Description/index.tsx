import React from 'react';
import TextBox from '../../atoms/TextBox';
import Image from '../../atoms/Image';
import './Description.scss';

const Description: React.FC = () => (
    <div className="landing__description">
        <TextBox>Lorem ipsum dolor sit amet.</TextBox>
        <Image src="/logo192.png" />
    </div>
);

export default Description;
