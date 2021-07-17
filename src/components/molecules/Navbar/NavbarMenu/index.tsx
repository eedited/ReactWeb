import React from 'react';
import LinkElement from '../../../atoms/LinkElement';

type NavbarMenuType = React.FC;
const NavbarMenu: NavbarMenuType = () => (
    <div>
        <LinkElement to="/" className="navbar__link">Video</LinkElement>
        <LinkElement to="/" className="navbar__link">FindingWork</LinkElement>
        <LinkElement to="/" className="navbar__link">HiringJob</LinkElement>
        <LinkElement to="/" className="navbar__link">Learn</LinkElement>
        <LinkElement to="/" className="navbar__link">Board</LinkElement>
        <LinkElement to="/" className="navbar__link">Chat</LinkElement>
    </div>
);

export default NavbarMenu;
