import {getData} from '../db-logic/db-logic'
import {useState, useEffect } from 'react'

import './todos.css'

export default function Todos ({listId}) {
    const [ todos, setTodos ] = useState([])
    let type = 'todos'
    useEffect( () => {
        const getTodos = async () => {
            const data = await getData(type, listId)
            setTodos(data)
        }

        getTodos()
    }, [])

    return (
        <ul className='ul-container'>
            { todos && todos.map( (todo) => {
                return (
                    <li id='todo' key={todo.id}>
                        {todo.name}
                    </li>
                )
            })}
        </ul>
    )
}