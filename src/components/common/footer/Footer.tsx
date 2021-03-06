import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../images/logo.svg';

const Footer: React.FC = () => (
    <>
        <div className="footer">
            <div className="footer__wrapper">
                <div className="footer__description">
                    <Link to="/"><Logo className="footer__description__logo" /></Link>
                    <p>
                        실력있는 영상 에디터들의 포트폴리오를
                        <br />
                        한 눈에 보고 바로 소통하는 비즈니스 커뮤니티
                    </p>
                    <a href={process.env.REACT_APP_DISCORD_LINK}>
                        <img className="footer__description__icons" src="/icons/sns/discord-icon.png" alt="discord" width="40" />
                    </a>
                </div>
                <div className="footer__sitemap">
                    <div className="footer__sitemap__column">
                        <div className="footer__sitemap__column__heading">포트폴리오</div>
                        <Link to="/videos?category=vlog&sorting=latest" className="footer__sitemap__column__link">브이로그</Link>
                        <Link to="/videos?category=vRadio&sorting=latest" className="footer__sitemap__column__link">보이는 라디오</Link>
                        <Link to="/videos?category=sports&sorting=latest" className="footer__sitemap__column__link">스포츠</Link>
                        <Link to="/videos?category=game&sorting=latest" className="footer__sitemap__column__link">게임</Link>
                        <Link to="/videos?category=it&sorting=latest" className="footer__sitemap__column__link">IT</Link>
                        <Link to="/videos?category=review&sorting=latest" className="footer__sitemap__column__link">리뷰</Link>
                        <Link to="/videos?category=beauty&sorting=latest" className="footer__sitemap__column__link">뷰티</Link>
                        <Link to="/videos?category=etc&sorting=latest" className="footer__sitemap__column__link">기타</Link>
                    </div>
                    <div className="footer__sitemap__column preparing">
                        <div className="footer__sitemap__column__heading">인재찾기</div>
                        <Link to="/" className="footer__sitemap__column__link">파트타임</Link>
                        <Link to="/" className="footer__sitemap__column__link">풀타임</Link>
                        <br />
                        <div className="footer__sitemap__column__heading">채용하기</div>
                        <Link to="/" className="footer__sitemap__column__link">파트타임</Link>
                        <Link to="/" className="footer__sitemap__column__link">풀타임</Link>
                    </div>
                    <div className="footer__sitemap__column preparing">
                        <div className="footer__sitemap__column__heading">배워보기</div>
                        <Link to="/" className="footer__sitemap__column__link">Premier Pro</Link>
                        <Link to="/" className="footer__sitemap__column__link">Final Cut Pro</Link>
                        <Link to="/" className="footer__sitemap__column__link">디자인</Link>
                        <Link to="/" className="footer__sitemap__column__link">사운드 에디팅</Link>
                    </div>
                    <div className="footer__sitemap__column preparing">
                        <div className="footer__sitemap__column__heading">커뮤니티</div>
                        <Link to="/" className="footer__sitemap__column__link">자유게시판</Link>
                        <Link to="/" className="footer__sitemap__column__link">익명게시판</Link>
                        <Link to="/" className="footer__sitemap__column__link">정보공유</Link>
                        <Link to="/" className="footer__sitemap__column__link">인재찾기 후기</Link>
                        <Link to="/" className="footer__sitemap__column__link">채용하기 후기</Link>
                    </div>
                </div>
                <div className="right_reserved">© eedited. All rights reserved.</div>
            </div>
        </div>
    </>
);

export default Footer;
