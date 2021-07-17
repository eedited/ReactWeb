import React from 'react';
import { Link } from 'react-router-dom';
import './Link.scss';

interface props{
    to: string,
    className: 'navbar__link'|'footer__link',
    children: React.ReactNode
}
type LinkElementType = ({ to, className, children }: props)=> JSX.Element
const LinkElement: LinkElementType = ({ to, children, className }: props): JSX.Element => (
    <Link to={to} className={className}>{children}</Link>
);

export default LinkElement;
