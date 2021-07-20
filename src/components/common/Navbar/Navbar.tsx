import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => (
    <div className="navbar">
        <div className="navbar__logo">
            <Link to="/">eedited</Link>
        </div>
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
    </div>
);

export default Navbar;
