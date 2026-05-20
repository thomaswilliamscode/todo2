import './addIndividualTodo.css'
import { useState, useContext} from'react'
import { useParams } from 'react-router-dom'
import { getData, maxPosition, pushData } from '../../db-logic/db-logic' 
import {TodosContext} from '../../context/todosContext'


export default function AddIndividualTodo({list}) {
    const { todos, setTodos } = useContext(TodosContext)
    const [ input, setInput ] = useState('')
    const table = 'todos'
    const {listId, folderId} = useParams()

    const id = list ? list.id : listId


    async function handleSubmit(e) {
        e.preventDefault()
        // get todo ready 
        const newTodo = {
            name: input,
            list_id: id,
        }
        // reset input value to empty string
        setInput('')

        // get maxPos from DB
        let pos = await maxPosition(table)
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
        setTodos(todoData)

        //save new todo info to localStorage
        localStorage.setItem('todos', JSON.stringify(todoData))
    }
    function handleChange(id){

    }
    return (
        <>
            <form
            value={id}
            onSubmit={(e)=> handleSubmit(e)}
            >
                <input 
                type='text'
                placeholder='Todo Name'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />

                <input type='submit'/>

            </form>
        </>
    )
}