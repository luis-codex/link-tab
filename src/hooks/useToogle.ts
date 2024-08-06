import { useState } from 'react';

export default function useToogle(onProp: boolean) {
    const [ on, setToggle ] = useState(onProp);
    const toggle = () => setToggle(prev => !prev);
    return [ on, toggle ] as const;
}
