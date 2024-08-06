import { useState, useRef, useCallback } from 'react';

interface LongPressEventHandlers {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
}

const useLongPress = (callback: () => void, ms: number = 3000): LongPressEventHandlers => {
    const [ isPressing, setIsPressing ] = useState<boolean>(false);
    const timerRef = useRef<number | null>(null);

    const start = useCallback(() => {
        setIsPressing(true);
        timerRef.current = window.setTimeout(() => {
            if (isPressing) {
                callback();
            }
        }, ms);
    }, [ callback, isPressing, ms ]);

    const stop = useCallback(() => {
        setIsPressing(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
    };
};

export default useLongPress;
