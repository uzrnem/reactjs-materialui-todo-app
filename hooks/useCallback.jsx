import { useCallback, useEffect, useState } from "react";

const Child = ({returnFunc, childNumber}) => {
    useEffect(() => {
        console.log("Child render", childNumber);
    }, [returnFunc])

    return <div style={{border: "1px solid red"}}>
        <h3>Child {childNumber}</h3>
        {returnFunc(childNumber)}
    </div>
}


export default function App() {
    const [toggle, setToggle] = useState(false);
    const [text, setText] = useState('This is');

    const changeText = () => {
        const txt = text.split(" ");
        setText(txt[1] + " " + txt[0])
    }

    const returnF = (name) => {
        return text + " : " + name
    }

    const returnFunction = useCallback(returnF, [text]);

    return (
        <div>
            <br />
            <h2>use Callback Example</h2>
            <br />
            <button onClick={() => setToggle(!toggle)}>Toggle</button>

            <h4>Normal Function</h4>
            <Child returnFunc={returnF} childNumber={1}/>
            <br />
            <button onClick={() => changeText()}>ChangeText</button>
            <br />
            <h4>Callback Function</h4>
            <Child returnFunc={returnFunction} childNumber={2}/>
            <br />
        </div>
        
    )

}