import { useMemo, useState } from "react";

export default function App() {
    const [toggle, setToggle] = useState(false);
    const [getRandom, setRandom] = useState(false);

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 100)
    }

    const getRandomNumber = useMemo(() => { //when return is value not function
        return Math.floor(Math.random() * 100)
    }, [getRandom]);

    return (
        <div>
            <br />
            <h2>use Memo Example</h2>
            <h4> Fetch Random Number: {getRandomNumber} -- This will be Generated only when Fetch button is clicked</h4>
            <br />
            <button onClick={() => setRandom(!getRandom)}>Fetch</button>
            <br />
            <br />
            <h4> Generate Random Number {generateRandomNumber()} -- This will be Generated everytime dom is rendered</h4>
            <br />
            <button onClick={() => setToggle(!toggle)}>Toggle</button>
        </div>
        
    )

}