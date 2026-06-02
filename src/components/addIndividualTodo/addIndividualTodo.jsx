import styles from './addIndividualTodo.module.css'
import { useState, useContext} from'react'
import { useParams } from 'react-router-dom'
import { getData, maxPosition, pushData } from '../../db-logic/db-logic' 
import {TodosContext} from '../../context/todosContext'
import {InboxContext} from '../../context/inboxContext'
import {capital} from '../../helpers/helpers' 


export default function AddIndividualTodo({list, inbox}) {
    const { todos, setTodos } = useContext(TodosContext)
    const { setInbox } = useContext(InboxContext)
    const [ input, setInput ] = useState('')
    let table = 'todos'
    const {listId, folderId} = useParams()

    let id = list ? list.id : listId

    if (inbox) {
        table = 'inbox'
    }


    async function handleSubmit(e) {
        e.preventDefault()
        let newName = capital(input)
        // get todo ready 
        let newTodo = {

        }
        if (inbox) {
            newTodo = {
                name: newName
            }
        } else {
            newTodo = {
            name: newName,
            list_id: id,
            }
        }
        
        // reset input value to empty string
        setInput('')

        // get maxPos from DB
        let pos = await maxPosition(table, listId)
        if(pos === null){
            pos = {
                position: -1
            }
        }

        //add position to newTodo
        newTodo.position = pos.position + 1

        // push new todo to database
        await pushData(newTodo, table)

        // get new todo info 
        const todoData = await getData(table)

        // set newTodo info 
        if (inbox) {
            setInbox(todoData)
            localStorage.setItem('inbox', JSON.stringify(todoData))
        } else {
            setTodos(todoData)
            //save new todo info to localStorage
            localStorage.setItem('todos', JSON.stringify(todoData))
        }

    }
    function handleChange(id){

    }
    return (
        <>
            <form
            value={id}
            onSubmit={(e)=> handleSubmit(e)}
            className={styles.form}
            >
                <input 
                type='text'
                placeholder='Todo Name'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.todoName}
                />

                <input className={styles.submit} type='submit'/>

            </form>
        </>
    )
}