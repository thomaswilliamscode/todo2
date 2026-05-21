import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 
import Delete from '../delete/delete'

import styles from './todos.module.css'

export default function Todos ({listId}) {
    const { todos, SetTodos } = useContext(TodosContext)
    const { id } = useParams()
    const filteredTodos = todos.filter( (todo) => todo.list_id === listId)
    return (
        <ul className={styles.ulContainer}>
            { todos && filteredTodos.map( (todo) => {
                return (
                    <div className={styles.todoContainer}>
                        <span></span>
                        <li className={styles.todo} key={todo.id}>
                            {todo.name}
                            
                        </li>
                        < Delete todoId={todo.id}/>
                    </div>
                )
            })}
        </ul>
    )
}