import { useEffect, useRef, useState } from 'react';

type ScrollEdgeDetection = {
    selectorChild?: string;
}

/**
 * Custom hook for detecting scroll edge positions.
 *
 * @param {ScrollEdgeDetection} options - The options for scroll edge detection.
 * @param {string} options.selectorChild - The selector for the child element to be used for scroll detection.
 * @returns {[React.RefObject<HTMLDivElement>, { isTop: boolean, isBottom: boolean }]} - A tuple containing the ref object and the active scroll edge positions.
 */
const useScrollEdgeDetection = ({ selectorChild }: ScrollEdgeDetection): [ React.RefObject<HTMLDivElement>, { isTop: boolean; isBottom: boolean; } ] => {
    const ref = useRef<HTMLDivElement>(null);
    const [ active, setActive ] = useState({ isTop: false, isBottom: false });

    useEffect(() => {
        const item = selectorChild ? ref.current?.querySelector(selectorChild) : ref.current;
        if (!item) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = item;
            const isBottom = scrollTop + clientHeight === scrollHeight;
            const isTop = scrollTop === 0;
            setActive({ isTop, isBottom });
        };

        handleScroll();
        item.addEventListener('scroll', handleScroll);
        return () => item.removeEventListener('scroll', handleScroll);
    }, [ selectorChild ]);

    return [ ref, active ] as const;
};

export default useScrollEdgeDetection;
