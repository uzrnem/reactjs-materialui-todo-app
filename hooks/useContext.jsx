import { createContext, useState, useContext } from "react";

const AppContext = createContext();

const Input = () => {
    const { setUsername } = useContext(AppContext);
    return (
        <input type="text" onChange={e => setUsername(e.target.value)} />
    )
}

const TextView = () => {
    const { username } = useContext(AppContext);
    return (
        <p>{username}</p>
    )
}

export default function App() {
    const [username, setUsername] = useState('');

    return (
        <AppContext.Provider value={{ username, setUsername }}>
            <Input />
            <TextView />
        </AppContext.Provider>
    )

}