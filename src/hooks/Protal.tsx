import React from 'react';
import { createPortal } from 'react-dom';

interface Props{
    children?: React.ReactNode
    elementId: string
}

const Protal: React.FC<Props> = ({ children, elementId }: Props) => {
    const rootElement: HTMLElement | null = React.useMemo(() => document.getElementById(elementId), [elementId]);
    return rootElement === null ? <></> : createPortal(children, rootElement);
};
Protal.defaultProps = {
    children: '',
};

export default Protal;
