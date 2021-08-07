import React from 'react';
import './WhiteButton.scss';

interface props{
    onClick: ()=> void,
    children?: React.ReactNode
    className?: string
}

const WhiteButton: React.FC<props> = ({ onClick, children, className }: props) => (
    <button className={`whiteButton ${className}`} onClick={onClick} type="button">{children}</button>
);

WhiteButton.defaultProps = {
    children: '',
    className: 'whiteButton',
};

export default WhiteButton;
