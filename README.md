# reactjs-materialui-todo-app

## commands to run

> json-server `npm run jsrv`
> run app `npm run dev`


npm create vite@latest .
npm i
npm run dev --host 5000
npm i @mui/material @emotion/react @emotion/styled
npm i @mui/icons-material
npm i react-router-dom
npm run dev


if (index > -1) { // only splice array when item is found
  array.splice(index, 1); // 2nd parameter means remove one item only
}







import { useEffect } from "react"

list = [ ...list, {}]
list = list.filter((x) => id !== x.id)

list.map((x) => x.id === id ? {...x, ...updated} : x)

const onSubmit = e => {
    e.preventDefault()
    console.log(data)
}

list = [...list, {id, ...data}]


useEffect(() => {
    const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }
    getTasks()
}, [])

const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
}
