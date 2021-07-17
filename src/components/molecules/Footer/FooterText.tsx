import React from 'react';
import LinkElement from '../../atoms/LinkElement';
import TextBox from '../../atoms/TextBox';

const FooterText: React.FC = () => (
    <div>
        <LinkElement to="/" className="footer__link">eedited</LinkElement>
        <TextBox>eedited is the worlds leading community</TextBox>
        <TextBox>for creative to share, grow and get hired</TextBox>
    </div>
);

export default FooterText;
