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
}: Props) => {
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
