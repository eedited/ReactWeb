import React from 'react';
import { S3Image } from 'aws-amplify-react';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userType } from '../../../modules/user/userType';
import BlueButton from '../Button/BlueButton';
import WhiteButton from '../Button/WhiteButton';
import './Navbar.scss';

interface props{
    user: userType|null
    isSearchClick: boolean
    onLogout: ()=> void
    onLogin: ()=> void
    onSignup: ()=> void
    onSearchClick: ()=> void
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
            <div className={isSearchClick ? 'navbar__utility navbar__find__activated' : 'navbar__utility'}>
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
                            <img className="navbar__utility__profile" src="https://bambam-bucket-for-service.s3.ap-northeast-2.amazonaws.com/img/profile-image.png" alt="profile" />
                            <div className="navbar__utility__nickname">{user.nickname}</div>
                            <BlueButton className="navbar__utility__button" onClick={() => { /* uploadfuc */ }}>Upload</BlueButton>
                        </div>
                    )}
            </div>
        </div>
        <hr className="navbar__bottom__line" />
    </>
);

export default Navbar;
