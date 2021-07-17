import React from 'react';
import LinkElement from '../../atoms/LinkElement';
import './FooterCols.scss';

const FooterCols: React.FC = () => (
    <div className="FooterCols">
        <div className="FooterCols__FooterCol">
            <div className="FooterCols__FooterCol__Heading">Videos</div>
            <LinkElement to="/" className="footer__link">V-log</LinkElement>
            <LinkElement to="/" className="footer__link">Game</LinkElement>
            <LinkElement to="/" className="footer__link">Beauty</LinkElement>
            <LinkElement to="/" className="footer__link">IT</LinkElement>
            <LinkElement to="/" className="footer__link">News</LinkElement>
            <LinkElement to="/" className="footer__link">Info</LinkElement>
            <LinkElement to="/" className="footer__link">Stocks</LinkElement>
            <LinkElement to="/" className="footer__link">Music</LinkElement>
        </div>
        <div className="FooterCols__FooterCol">
            <div className="FooterCols__FooterCol__Heading">Finding Works</div>
            <LinkElement to="/" className="footer__link">Part-Time</LinkElement>
            <LinkElement to="/" className="footer__link">Full-Time</LinkElement>
            <br />
            <div className="FooterCols__FooterCol__Heading">Hiring Jobs</div>
            <LinkElement to="/" className="footer__link">Part-Time</LinkElement>
            <LinkElement to="/" className="footer__link">Full-Time</LinkElement>
        </div>
        <div className="FooterCols__FooterCol">
            <div className="FooterCols__FooterCol__Heading">Learn</div>
            <LinkElement to="/" className="footer__link">프리미어</LinkElement>
            <LinkElement to="/" className="footer__link">파이널 컷 프로</LinkElement>
            <LinkElement to="/" className="footer__link">디자인</LinkElement>
        </div>
        <div className="FooterCols__FooterCol">
            <div className="FooterCols__FooterCol__Heading">Board</div>
            <LinkElement to="/" className="footer__link">자유게시판</LinkElement>
            <LinkElement to="/" className="footer__link">질의게시판</LinkElement>
            <LinkElement to="/" className="footer__link">정보게시판</LinkElement>
            <LinkElement to="/" className="footer__link">익명게시판</LinkElement>
            <LinkElement to="/" className="footer__link">Finding Wokrs 후기</LinkElement>
            <LinkElement to="/" className="footer__link">Hiring Jobs 후기</LinkElement>
        </div>

    </div>
);

export default FooterCols;
