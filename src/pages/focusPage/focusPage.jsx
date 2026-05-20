import './focusPage.css'
import {TodosContext} from '../../context/todosContext'
import { useState, useEffect, useContext} from 'react'
import Delete from '../../components/delete/delete'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import {InboxContext} from '../../context/inboxContext'

export default function FocusPage () {
    const { todos, setTodos } = useContext(TodosContext)
    const { inbox, setInbox } = useContext(InboxContext)
    return (
        <>
            <h1 className='list-title'>Focus Page</h1>
            <ul className='ul-container'>
                {inbox && inbox.map( (todo) => {
                    const { id, name} = todo
                    return (
                        <li 
                        className='todo'
                        key={id}>{name}
                        < Delete focusInbox={id}/>
                        </li>
                    )
                })}
                {todos && todos.map( (todo) => {
                    const {id, name} = todo
                    return (
                        <li className='todo' key={id}>{name}
                            < Delete focusTodo={id}/>
                        </li>
                    )
                    
                })}
                <AddIndividualTodo inbox={'inbox'}/>
            </ul>
        </>
    )
}