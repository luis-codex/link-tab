import { EffectCallback, useEffect, useRef } from "react";

export default function useEffectSec(effect: EffectCallback) {
    const refFirst = useRef(false);

    useEffect(() => {
        if (!refFirst.current) {
            refFirst.current = true;
            return;
        }

        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ refFirst.current ]);
}
