import './listPage.css'
import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 
import {ListContext} from '../../context/listContext' 
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import Delete from '../../components/delete/delete.jsx'

export default function ListPage() {
    const { todos, setTodos } = useContext(TodosContext)
    const { lists, setLists, } = useContext(ListContext)
    const { listId, folderId } = useParams()

    if (!todos || !lists) {
        return <div>Loading...</div>
    }
    let id = ''

    if (listId) {
        id = listId
    } else {
        id = folderId
    }

    let filteredTodos = todos.filter( (todo) => todo.list_id === id)
    let currentList = lists.find( (list) => list.id === id)

    useEffect( () => {
        filteredTodos = todos.filter( (todo) => todo.list_id === id)
        currentList = lists.find( (list) => list.id === id)
    }, [todos])


    return (
        <div>
            <ul className='ul-container'>
                { currentList && (
                    <h1>
                        {currentList.name}
                        <Delete listId={listId}/>
                    </h1>
                )}
                { todos && filteredTodos.map( (todo) => {
                    return (
                        <div key={todo.id}>
                            <li id='todo'>
                                <></>
                                {todo.name}
                                <Delete todoId={todo.id}/>
                            </li>
                            
                        </div>
                    )
                })}
                <AddIndividualTodo list={currentList}/>
            </ul>
            
        </div>

    
    )
    
    
}