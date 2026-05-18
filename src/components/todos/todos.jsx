import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 

import './todos.css'

export default function Todos ({listId}) {
    const { todos, SetTodos } = useContext(TodosContext)
    const { id } = useParams()
    const filteredTodos = todos.filter( (todo) => todo.list_id === listId)
    return (
        <ul className='ul-container'>
            { todos && filteredTodos.map( (todo) => {
                return (
                    <li id='todo' key={todo.id}>
                        {todo.name}
                    </li>
                )
            })}
        </ul>
    )
}