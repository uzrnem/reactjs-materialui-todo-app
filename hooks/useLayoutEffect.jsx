import { useLayoutEffect, useEffect } from "react";

export default function useLayoutEffectHook() {
    useEffect(() => {
        console.log('useEffect')
    }, []);

    useLayoutEffect(() => {
        console.log('useLayoutEffect')
    }, [])

    return <div></div>
}