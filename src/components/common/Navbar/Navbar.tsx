import React from 'react';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userType } from '../../../redux/user/userType';
import BlueButton from '../Button/BlueButton';
import WhiteButton from '../Button/WhiteButton';
import './Navbar.scss';

interface props{
    user: userType|null
    isSearchClick: boolean
    onLogout: () => void
    onLogin: () => void
    onSignup: () => void
    onSearchClick: () => void
}

const Navbar: React.FC<props> = ({
    user, onLogout, onLogin, onSignup, isSearchClick, onSearchClick,
}: props) => (
    <>
        <div className="navbar">
            <div className="navbar__menu">
                <Link to="/">
                    <img className="navbar__menu__logo" src="/icons/orange-logo.png" alt="eedited_logo" />
                </Link>
                <div className="navbar__menu__links">
                    <Link className="navbar__menu__link" to="/">포트폴리오</Link>
                    <Link className="navbar__menu__link" to="/">인재찾기</Link>
                    <Link className="navbar__menu__link" to="/">채용하기</Link>
                    <Link className="navbar__menu__link preparing" to="/">배워보기</Link>
                    <Link className="navbar__menu__link preparing" to="/">커뮤니티</Link>
                </div>
            </div>
            <div className="navbar__utility">
                {!isSearchClick ? (
                    <div className="navbar__utility__find">
                        <FontAwesomeIcon className="navbar__utility__findIcon" icon={faSearch} onClick={onSearchClick} />
                    </div>
                )
                    : (
                        <div className="navbar__utility__find find__activated">
                            <FontAwesomeIcon className="navbar__utility__findIcon" icon={faSearch} onClick={onSearchClick} />
                            <input className="navbar__utility__find__input" onSubmit={() => { /* submit 될때 해야할일 */ }} />
                        </div>
                    )}

                {user === null
                    ? (
                        <div className="navbar__utility__buttons">
                            <WhiteButton className="navbar__utility__button" onClick={onLogin}>Sign In</WhiteButton>
                            <BlueButton className="navbar__utility__button" onClick={onSignup}>Sign Up</BlueButton>
                        </div>
                    )
                    : (
                        <div className="navbar__utility__buttons">
                            <div className="navbar__utility__dropdown">
                                <img className="navbar__utility__profile" src="https://bambam-bucket-for-service.s3.ap-northeast-2.amazonaws.com/img/profile-image.png" alt="profile" />
                                <div className="navbar__utility__nickname">{user.nickname}</div>

                                <ul className="navbar__utility__dropdown__list">
                                    <li className="navbar__utility__dropdown__item navbar__utility__dropdown__item__top">
                                        <button onClick={onLogout} type="button">
                                            <div className="navbar__utility__dropdown__item__flex">
                                                <img
                                                    src="/icons/mypage-icon.png"
                                                    alt="mypage-icon"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                                <div>마이페이지</div>
                                            </div>
                                        </button>
                                    </li>
                                    <li className="navbar__utility__dropdown__item">
                                        <button onClick={onLogout} type="button">
                                            <div className="navbar__utility__dropdown__item__flex">
                                                <img
                                                    src="/icons/chat-icon.png"
                                                    alt="chat-icon"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                                <div>대화</div>
                                            </div>
                                        </button>
                                    </li>

                                    <li className="navbar__utility__dropdown__item">
                                        <button onClick={onLogout} type="button">
                                            <div className="navbar__utility__dropdown__item__flex">
                                                <img
                                                    src="/icons/upload-icon.png"
                                                    alt="upload-icon"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                                <div>업로드</div>
                                            </div>
                                        </button>
                                    </li>
                                    <li className="navbar__utility__dropdown__item navbar__utility__dropdown__item__bottom">
                                        <button onClick={onLogout} type="button">
                                            <div className="navbar__utility__dropdown__item__flex">
                                                <img
                                                    src="/icons/logout-icon.png"
                                                    alt="logout-icon"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                                <div>로그아웃</div>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <BlueButton className="navbar__utility__button" onClick={() => { /* uploadfuc */ }}>Upload</BlueButton>
                        </div>
                    )}
            </div>
        </div>
        <hr className="navbar__bottom__line" />
    </>
);

export default Navbar;
