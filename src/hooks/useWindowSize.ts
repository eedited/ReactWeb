import { useEffect, useState } from 'react';

export interface windowSizeType{
    height: number|undefined,
    width: number|undefined,
}

const useWindowSize: () => windowSizeType = () => {
    const isClient: boolean = typeof window === 'object';
    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }
    const [windowSize, setWindowSize]: [windowSizeType, React.Dispatch<React.SetStateAction<windowSizeType>>] = useState(getSize);
    useEffect(() => {
        if (!isClient) return () => {};
        function handleResize() {
            setWindowSize(getSize());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient]);
    return windowSize;
};

export default useWindowSize;
