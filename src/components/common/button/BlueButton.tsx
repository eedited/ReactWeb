import React from 'react';
import './BlueButton.scss';

interface Props {
    onClick: () => void,
    children?: React.ReactNode
    className?: string
    type?: string
}

const BlueButton: React.FC<Props> = ({
    onClick, children, className, type,
}: Props) => (
    <button
        className={`blueButton ${className}`}
        onClick={onClick}
        type={type === 'submit' ? 'submit' : 'button'}
    >
        {children}
    </button>
);

BlueButton.defaultProps = {
    children: '',
    className: '',
    type: 'button',
};

export default BlueButton;
