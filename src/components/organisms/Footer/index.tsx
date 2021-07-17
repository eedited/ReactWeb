import React from 'react';
import FooterCols from '../../molecules/Footer/FooterCols';
import FooterText from '../../molecules/Footer/FooterText';
import './Footer.scss';

const Footer: React.FC = () => (
    <div className="Footer">
        <FooterText />
        <FooterCols />
    </div>
);

export default Footer;
