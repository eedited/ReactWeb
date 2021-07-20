import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
    <div className="footer">
        <div className="footer__description">
            <Link to="/">eedited</Link>
            <p>
                eedited is the worlds leading community
                for creatives to share, grow and get hired
            </p>
        </div>
        <div className="footer__sitemap">
            <div className="footer__sitemap__column">
                <div className="footer__sitemap__column__heading">Videos</div>
                <Link to="/" className="footer__sitemap__column__link">V-log</Link>
                <Link to="/" className="footer__sitemap__column__link">Game</Link>
                <Link to="/" className="footer__sitemap__column__link">Beauty</Link>
                <Link to="/" className="footer__sitemap__column__link">IT</Link>
                <Link to="/" className="footer__sitemap__column__link">News</Link>
                <Link to="/" className="footer__sitemap__column__link">Info</Link>
                <Link to="/" className="footer__sitemap__column__link">Stocks</Link>
                <Link to="/" className="footer__sitemap__column__link">Music</Link>
            </div>
            <div className="footer__sitemap__column">
                <div className="footer__sitemap__column__heading">Finding Works</div>
                <Link to="/" className="footer__sitemap__column__link">Part-Time</Link>
                <Link to="/" className="footer__sitemap__column__link">Full-Time</Link>
                <br />
                <div className="footer__sitemap__column__heading">Hiring Jobs</div>
                <Link to="/" className="footer__sitemap__column__link">Part-Time</Link>
                <Link to="/" className="footer__sitemap__column__link">Full-Time</Link>
            </div>
            <div className="footer__sitemap__column">
                <div className="footer__sitemap__column__heading">Learn</div>
                <Link to="/" className="footer__sitemap__column__link">프리미어</Link>
                <Link to="/" className="footer__sitemap__column__link">파이널 컷 프로</Link>
                <Link to="/" className="footer__sitemap__column__link">디자인</Link>
            </div>
            <div className="footer__sitemap__column">
                <div className="footer__sitemap__column__heading">Board</div>
                <Link to="/" className="footer__sitemap__column__link">자유게시판</Link>
                <Link to="/" className="footer__sitemap__column__link">질의게시판</Link>
                <Link to="/" className="footer__sitemap__column__link">정보게시판</Link>
                <Link to="/" className="footer__sitemap__column__link">익명게시판</Link>
                <Link to="/" className="footer__sitemap__column__link">Finding Wokrs 후기</Link>
                <Link to="/" className="footer__sitemap__column__link">Hiring Jobs 후기</Link>
            </div>

        </div>
    </div>
);

export default Footer;
