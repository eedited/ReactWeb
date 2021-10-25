import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
import { ReactComponent as Logo } from '../../../images/logo.svg';
import BlueButton from '../button/BlueButton';
import WhiteButton from '../button/WhiteButton';
import './Navbar.scss';
import AuthProtal from '../../../containers/auth/AuthProtal';

export interface ModalTriggerType{
    isModalOn: boolean,
    type: 'login'|'signup'
}
interface props extends RouteComponentProps{
    user: AuthRouter.CheckSuccessResponse|null
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
    user, onLogout, onLogin, onSignup, isSearchClick, onUpload, ModalTrigger, isHambergerClick, onHambergerClick, onSearchChange, searchInput, onKeyPressSearch, onClickSearch, history,
}: props) => (
    <>
        <nav className="navbar">
            <Link to="/">
                <Logo className="navbar__menu__logo" />
            </Link>
            <div className={isHambergerClick ? 'navbar__menu navbar__show' : 'navbar__menu'}>
                <div className="navbar__menu__links">
                    {!user
                        ? <button className="navbar__menu__link" onClick={onLogin} type="button">포트폴리오</button>
                        : <Link className="navbar__menu__link" to={`/profile?userId=${user.userId}`}>포트폴리오</Link>}
                    <a target="_blank" className="navbar__menu__link" href="https://necessary-icon-db1.notion.site/0d75bc34ecd54d6c9d2fc8567006b9c3" rel="noreferrer">패치노트</a>
                    {!user
                        ? <button className="navbar__menu__link" onClick={onLogin} type="button">건의하기</button>
                        : <Link className="navbar__menu__link" to="/AccountSetting/request">건의하기</Link>}
                    <Link className="navbar__menu__link" to="/">Videos</Link>
                </div>
                {!isSearchClick ? (
                    <button className="navbar__utility__find" onClick={onClickSearch} type="button">
                        <img className="navbar__utility__findIcon" src="/icons/search-icon.png" alt="search" />
                    </button>
                )
                    : (
                        <div className="navbar__utility__find find__activated">
                            <button type="button" onClick={onClickSearch}>
                                <img className="navbar__utility__findIcon" src="/icons/search-icon.png" alt="search" />
                            </button>
                            <input className="navbar__utility__find__input" value={searchInput} onChange={onSearchChange} onKeyPress={onKeyPressSearch} />
                        </div>
                    )}
            </div>
            <div className={isHambergerClick ? 'navbar__show navbar__utility' : 'navbar__utility'}>
                {
                    user === null
                        ? (
                            <div className="navbar__utility__buttons">
                                <WhiteButton className="navbar__utility__button" onClick={onLogin}>로그인</WhiteButton>
                                <BlueButton className="navbar__utility__button" onClick={onSignup}>회원가입</BlueButton>
                            </div>
                        )
                        : (
                            <>
                                <div className="navbar__utility__dropdown">
                                    <div className="navbar__utility__main">
                                        <div className="navbar__utility__profile__wrapper">
                                            <img className="navbar__utility__profile" src={user.profilePicture} alt="profile" />
                                        </div>
                                        {/* <div className="navbar__utility__nickname">{user.nickname}</div> */}
                                    </div>
                                    <ul className="navbar__utility__dropdown__list">
                                        <li className="navbar__utility__dropdown__item navbar__utility__dropdown__item__top">
                                            <button
                                                onClick={() => {
                                                    history.push(`/profile?userId=${user.userId}`);
                                                }}
                                                type="button"
                                            >
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/mypage-icon.png"
                                                        alt="mypage-icon"
                                                    />
                                                    <Link to={`/profile?userId=${user.userId}`}>포트폴리오</Link>
                                                </div>
                                            </button>
                                        </li>
                                        <li className="navbar__utility__dropdown__item preparing">
                                            <button
                                                onClick={() => {
                                                    history.push('/chat');
                                                }}
                                                type="button"
                                            >
                                                <div className="navbar__utility__dropdown__item__flex">
                                                    <img
                                                        className="navbar__utility__dropdown__item__flex__img"
                                                        src="/icons/chat-icon.png"
                                                        style={{ opacity: 0.3 }}
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
                                            <button
                                                onClick={() => {
                                                    history.push('/AccountSetting');
                                                }}
                                                type="button"
                                            >
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
                                    {/* <WhiteButton className="navbar__utility__button" onClick={onUpload}>Apply</WhiteButton> */}
                                    <BlueButton className="navbar__utility__button" onClick={onUpload}>Upload</BlueButton>
                                </div>

                            </>
                        )
                }
                <div>
                    {
                        (ModalTrigger.isModalOn && (ModalTrigger.type === 'login'))
                                && (
                                    <AuthProtal backgroundClicked={onLogin} type="login" />
                                )
                    }
                </div>
                <div>
                    {
                        (ModalTrigger.isModalOn && (ModalTrigger.type === 'signup'))
                                && (
                                    <AuthProtal backgroundClicked={onSignup} type="signup" />
                                )
                    }
                </div>
            </div>
            <button className="navbar__hamberger__icon__button" type="button" onClick={onHambergerClick}>
                <img className="navbar__hamberger__icon" src="/icons/bar-icon.png" alt="bar" />
            </button>
        </nav>
    </>
);

export default React.memo(withRouter(Navbar));
