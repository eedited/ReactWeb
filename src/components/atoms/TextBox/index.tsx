import React from 'react';

interface props{
    children: string,
    color?: string,
    size?: 'small'|'medium'|'big'
}
const TextBox: React.FC<props> = ({ color, size, children }: props) => {
    let fontSize: string = '1.0em';
    if (size === 'small') fontSize = '0.7em';
    else if (size === 'big') fontSize = '1.5em';
    return (
        <div style={{
            color,
            fontSize,
        }}
        >
            {children}
        </div>

    );
};
TextBox.defaultProps = {
    color: 'black',
    size: 'medium',
};
export default TextBox;
