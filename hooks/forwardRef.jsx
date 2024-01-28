import { useRef, useState, forwardRef, useImperativeHandle } from "react";

const CheckBox = forwardRef((props, ref) => {
    const [checked, setChecked] = useState(false);

    useImperativeHandle(ref, () => ({
        toggle() {
            setChecked(!checked);
        }
    }))

    return (
        <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
    )
})

export default function App() {
    const ref = useRef();
    return (
        <div>
            <br />
            <br /><br />
            <button onClick={() => ref.current.toggle()}>Toggle</button>
            <br />
            <CheckBox ref={ref} />
        </div>
    )

}