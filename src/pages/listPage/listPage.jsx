import './listPage.css'
import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 
import {ListContext} from '../../context/listContext' 

export default function ListPage() {
    const { todos, SetTodos } = useContext(TodosContext)
    const { lists, setLists } = useContext(ListContext)
    const { id } = useParams()

    if (!todos || !lists) {
        return <div>Loading...</div>
    }

    if (todos && lists) {
        const filteredTodos = todos.filter( (todo) => todo.list_id === id)
        const currentList = lists.find( (list) => list.id === id)
        return (
            <ul className='ul-container'>
                <h1>{currentList?.name}</h1>
                { todos && filteredTodos.map( (todo) => {
                    return (
                        <div key={todo.id}>
                            <li id='todo'>
                                {todo.name}
                            </li>
                        </div>
                    )
                })}
            </ul>

        
        )
    } 
    
    
}