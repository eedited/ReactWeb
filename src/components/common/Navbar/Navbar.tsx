import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import NavbarOnlyLogo from './NavbarOnlyLogo';

const Navbar: React.FC = () => (
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
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
        </div>
    </NavbarOnlyLogo>
);

export default Navbar;
