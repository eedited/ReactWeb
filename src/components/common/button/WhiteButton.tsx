import React from 'react';
import './WhiteButton.scss';

interface Props {
    onClick: () => void,
    children?: React.ReactNode
    className?: string
}

const WhiteButton: React.FC<Props> = ({ onClick, children, className }: Props) => (
    <button className={`whiteButton ${className}`} onClick={onClick} type="button">{children}</button>
);

WhiteButton.defaultProps = {
    children: '',
    className: 'whiteButton',
};

export default WhiteButton;
