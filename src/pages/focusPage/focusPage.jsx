import styles from './focusPage.module.css'
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
            <h1 className={styles.listTitle}>Focus Page</h1>
            <ul className={styles.ulContainer}>
                {inbox && inbox.map( (todo) => {
                    const { id, name} = todo
                    return (
                        <li 
                        className={styles.todo}
                        key={id}>
                            <span></span>
                            {name}
                            < Delete focusInbox={id}/>
                        </li>
                    )
                })}
                {todos && todos.map( (todo) => {
                    const {id, name} = todo
                    return (
                        <li className={styles.todo} key={id}>{name}
                            < Delete focusTodo={id}/>
                        </li>
                    )
                    
                })}
                
            </ul>
            <div className={styles.addTodo}>
                <AddIndividualTodo inbox={'inbox'}/>
            </div>
        </>
    )
}