import React from 'react';
import { Link } from 'react-router-dom';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlueButton from '../Button/BlueButton';
import WhiteButton from '../Button/WhiteButton';
import './Navbar.scss';
import LoginOverlayContainer from '../../../containers/auth/LoginOverlayContainer';
import SignupOverlayContainer from '../../../containers/auth/SignupOverlayContainer';

export interface ModalTriggerType{
    isModalOn: boolean,
    type: 'login'|'signup'
}
interface props{
    user: User|null
    isSearchClick: boolean
    isHambergerClick: boolean
    ModalTrigger: ModalTriggerType
    onLogout: () => void
    onLogin: () => void
    onSignup: () => void
    onUpload: () => void
    onHambergerClick: () => void
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onKeyPressSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onClickSearch: () => void
    searchInput: string
}

const Navbar: React.FC<props> = ({
    user, onLogout, onLogin, onSignup, isSearchClick, onUpload, ModalTrigger, isHambergerClick, onHambergerClick, onSearchChange, searchInput, onKeyPressSearch, onClickSearch,
}: props) => (
    <>
        <nav className="navbar">
            <Link to="/">
                <img className="navbar__menu__logo" src="/icons/orange-logo.png" alt="eedited_logo" />
            </Link>
            <div className={isHambergerClick ? 'navbar__menu navbar__show' : 'navbar__menu'}>
                <div className="navbar__menu__links">
                    <Link className="navbar__menu__link" to="/">포트폴리오</Link>
                    <a target="_blank" className="navbar__menu__link" href="https://stone-suede-b8c.notion.site/Edited-com-8e4418290c4143b0b982a5f1382eacc6" rel="noreferrer">About Us</a>
                    <Link className="navbar__menu__link" to="/AccountSetting/request">건의하기</Link>
                    <Link className="navbar__menu__link preparing" to="/finding">인재찾기</Link>
                    <Link className="navbar__menu__link preparing" to="/hiring">채용하기</Link>
                    <Link className="navbar__menu__link preparing" to="/">커뮤니티</Link>
                </div>
                {!isSearchClick ? (
                    <div className="navbar__utility__find">
                        <FontAwesomeIcon className="navbar__utility__findIcon" icon={faSearch} onClick={onClickSearch} />
                    </div>
                )
                    : (
                        <div className="navbar__utility__find find__activated">
                            <FontAwesomeIcon className="navbar__utility__findIcon" icon={faSearch} />
                            <input className="navbar__utility__find__input" value={searchInput} onChange={onSearchChange} onKeyPress={onKeyPressSearch} />
                        </div>
                    )}
            </div>
            <div className={isHambergerClick ? 'navbar__show navbar__utility' : 'navbar__utility'}>
                {
                    user === null
                        ? (
                            <div className="navbar__utility__buttons">
                                <WhiteButton className="navbar__utility__button" onClick={onLogin}>Sign in</WhiteButton>
                                <BlueButton className="navbar__utility__button" onClick={onSignup}>Sign up</BlueButton>
                            </div>
                        )
                        : (
                            <>
                                <div className="navbar__utility__dropdown">
                                    <div className="navbar__utility__main">
                                        <img className="navbar__utility__profile" src="https://bambam-bucket-for-service.s3.ap-northeast-2.amazonaws.com/img/profile-image.png" alt="profile" />
                                        <div className="navbar__utility__nickname">{user.nickname}</div>
                                    </div>
                                    <ul className="navbar__utility__dropdown__list">
                                        <li className="navbar__utility__dropdown__item navbar__utility__dropdown__item__top">
                                            <button onClick={() => { /**/ }} type="button">
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/mypage-icon.png"
                                                        alt="mypage-icon"
                                                    />
                                                    <Link to={`/profile?userId=${user.userId}`}>마이페이지</Link>
                                                </div>
                                            </button>
                                        </li>
                                        <li className="navbar__utility__dropdown__item">
                                            <button onClick={() => { /**/ }} type="button">
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/chat-icon.png"
                                                        alt="chat-icon"
                                                    />
                                                    <Link to="/chat">대화</Link>
                                                </div>
                                            </button>
                                        </li>

                                        <li className="navbar__utility__dropdown__item">
                                            <button onClick={onUpload} type="button">
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/upload-icon.png"
                                                        alt="upload-icon"
                                                    />
                                                    <div>업로드</div>
                                                </div>
                                            </button>
                                        </li>
                                        <li className="navbar__utility__dropdown__item">
                                            <button onClick={() => { /**/ }} type="button">
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/setting-icon.png"
                                                        alt="setting-icon"
                                                    />
                                                    <Link to="/AccountSetting">설정</Link>
                                                </div>
                                            </button>
                                        </li>
                                        <li className="navbar__utility__dropdown__item navbar__utility__dropdown__item__bottom">
                                            <button onClick={onLogout} type="button">
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/logout-icon.png"
                                                        alt="logout-icon"
                                                    />
                                                    <div>로그아웃</div>
                                                </div>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="navbar__utility__buttons">
                                    <WhiteButton className="navbar__utility__button" onClick={onUpload}>Apply</WhiteButton>
                                    <BlueButton className="navbar__utility__button" onClick={onUpload}>Upload</BlueButton>
                                </div>

                            </>
                        )
                }
                <div>
                    {
                        (ModalTrigger.isModalOn && (ModalTrigger.type === 'login'))
                                && (
                                    <LoginOverlayContainer backgroundClicked={onLogin} />
                                )
                    }
                </div>
                <div>
                    {
                        (ModalTrigger.isModalOn && (ModalTrigger.type === 'signup'))
                                && (
                                    <SignupOverlayContainer backgroundClicked={onSignup} />
                                )
                    }
                </div>
            </div>
            <FontAwesomeIcon className="navbar__hamberger__icon" icon={faBars} onClick={onHambergerClick} />
        </nav>
        <hr className="navbar__bottom__line" />
    </>
);

export default Navbar;
