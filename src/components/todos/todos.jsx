import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 

import './todos.css'

export default function Todos () {
    const { todos, SetTodos } = useContext(TodosContext)
    const { id } = useParams()
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