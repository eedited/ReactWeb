import React from 'react';
import { Link } from 'react-router-dom';
import { userType } from '../../../modules/user/userType';
import './Navbar.scss';

interface props{
    user: userType|null
    onLogout: ()=> void
}
const Navbar: React.FC<props> = ({ user, onLogout }: props) => (
    <div className="navbar">
        <div className="navbar__menu">
            <img className="navbar__menu__logo" />
            <div className="navbar__menu__links">
                <div className="navbar__menu__link">포트폴리오</div>
                <div className="navbar__menu__link">인재찾기</div>
                <div className="navbar__menu__link">채용하기</div>
                <div className="navbar__menu__link">배워보기</div>
                <div className="navbar__menu__link">커뮤니티</div>
            </div>
        </div>
    </div>
);

export default Navbar;
