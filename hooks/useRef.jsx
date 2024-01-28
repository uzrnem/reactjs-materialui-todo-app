import { useRef } from "react";

export default function useRefHook() {

    const inputElement = useRef();

    return (
        <>
            <input ref={inputElement} />
            <button onClick={() => inputElement.current.focus()}>Focus</button>
            <button onClick={() => inputElement.current.blur()}>Blur</button>
            <button onClick={() => inputElement.current.select()}>Select</button>
            <button onClick={() => inputElement.current.value = 'hello'}>hello</button>
        </>
    )
}