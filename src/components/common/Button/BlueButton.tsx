import React from 'react';
import './BlueButton.scss';

interface props{
    onClick: ()=> void,
    children?: React.ReactNode
    className?: string
}

const BlueButton: React.FC<props> = ({ onClick, children, className }: props) => (
    <button className={`blueButton ${className}`} onClick={onClick} type="button">{children}</button>
);

BlueButton.defaultProps = {
    children: '',
    className: '',
};

export default BlueButton;
