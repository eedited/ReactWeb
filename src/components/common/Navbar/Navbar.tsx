import React from 'react';
import { Link } from 'react-router-dom';
import { userType } from '../../../modules/user/userType';
import './Navbar.scss';
import NavbarOnlyLogo from './NavbarOnlyLogo';

interface props{
    user: userType|null
    onLogout: ()=> void
}
const Navbar: React.FC<props> = ({ user, onLogout }: props) => (
    <NavbarOnlyLogo>
        <div className="navbar__menu">
            <Link to="/">Video</Link>
            <Link to="/">Finding Wokrs</Link>
            <Link to="/">Hiring Job</Link>
            <Link to="/">Learn</Link>
            <Link to="/">Board</Link>
            <Link to="/">Chat</Link>
        </div>
        <div className="navbar__utility">
            {user === null
                ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                )
                : (
                    <>
                        {user.userId}
                        <button type="button" onClick={onLogout}>로그아웃</button>
                    </>
                )}
        </div>
    </NavbarOnlyLogo>
);

export default Navbar;
