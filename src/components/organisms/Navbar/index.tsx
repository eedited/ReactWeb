import React from 'react';
import NavbarMenu from '../../molecules/Navbar/NavbarMenu';
import NavbarUtility from '../../molecules/Navbar/NavbarUtility';
import LinkElement from '../../atoms/LinkElement';
import './Navbar.scss';

type NavbarType = React.FC
const Navbar: NavbarType = () => (
    <div className="Navbar">
        <LinkElement to="/" className="navbar__link">eedited</LinkElement>
        <NavbarMenu />
        <NavbarUtility />
    </div>
);

export default Navbar;
