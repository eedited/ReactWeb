import React from 'react';
import './BlueButton.scss';

interface props{
    onClick: () => void,
    children?: React.ReactNode
    className?: string
    type?: string
}

const BlueButton: React.FC<props> = ({
    onClick, children, className, type,
}: props) => {
    if (type === 'submit') {
        return (
            <button className={`blueButton ${className}`} onClick={onClick} type="submit">{children}</button>
        );
    }
    return (
        <button className={`blueButton ${className}`} onClick={onClick} type="button">{children}</button>
    );
};

BlueButton.defaultProps = {
    children: '',
    className: '',
    type: 'button',
};

export default BlueButton;
