import { useEffect, useState } from 'react';

export default function useEffectHook() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => setCount(count + 1), 1000);
    })

    return (
        
        <div>
            {count}
        </div>
    )
}