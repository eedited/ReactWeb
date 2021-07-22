import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

interface props{
    children?: React.ReactNode
}
const NavbarOnlyLogo: React.FC<props> = ({ children }: props) => (
    <div className="navbar">
        <div className="navbar__logo">
            <Link to="/">eedited</Link>
        </div>
        {children}
    </div>
);
NavbarOnlyLogo.defaultProps = {
    children: '',
};

export default NavbarOnlyLogo;
