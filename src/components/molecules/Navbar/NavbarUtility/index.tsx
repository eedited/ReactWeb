import React from 'react';
import LinkElement from '../../../atoms/LinkElement';

type NavbarUtilityType = React.FC
const NavbarUtility: NavbarUtilityType = () => (
    <div>
        <LinkElement to="" className="navbar__link">Login</LinkElement>
        <LinkElement to="" className="navbar__link">Logout</LinkElement>
    </div>
);

export default NavbarUtility;
