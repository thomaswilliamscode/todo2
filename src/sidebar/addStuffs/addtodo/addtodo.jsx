import './addtodo.css'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../../context/listContext'
import { TodosContext } from '../../../context/todosContext'
import {InboxContext} from '../../../context/inboxContext'
import { pushData, maxPosition, getData } from '../../../db-logic/db-logic'

export default function AddTodo () {
    const { lists } = useContext(ListContext)
    const { todos, setTodos } = useContext(TodosContext)
    const { inbox, setInbox } = useContext(InboxContext)
    const [ input, setInput ] = useState([])
    const [ activeList, setActiveList ] = useState('')
    const [ displayLists, setDisplayLists ] = useState([])

    const localLists = JSON.parse(localStorage.getItem('lists'))

    useEffect( () => {
        setDisplayLists([
            { name: 'Inbox', list_Id: 'inbox'},
            ...lists
        ])
        setActiveList('inbox')
    }, [lists])
    
    async function handleSubmit(e) {
        e.preventDefault()
        let table = ''
        let newTodo = {
            name: input
        }
        // add input to that list 
        if (activeList === 'inbox') {
            table = 'inbox'
        } else {
            table ='todos'
            newTodo.list_id = activeList
        }
        

        // set input to empty 
        setInput('')
        let pos = await maxPosition(table)
        if(pos === null){
            pos = {
                position: -1
            }
        }
        newTodo.position = pos.position + 1
        
        await pushData(newTodo, table)
        // get data from api again
        const newTodos = await getData(table)
        if (activeList === 'inbox') {
            setInbox(newTodos)
            localStorage.setItem('inbox', JSON.stringify(newTodos))
        } else {
            setTodos(newTodos)
            localStorage.setItem('todos', JSON.stringify(newTodos))
        }
        

    }



    function handleChange(e) {
        setInput(e.target.value)
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type='text' 
            placeholder='Todo Name' 
            value={input}
            onChange={ (e) => handleChange(e)}
            />
            <input type='submit'/>
            <select onChange={ (e) => setActiveList(e.target.value)}>
                {lists && displayLists.map( (list) => {
                    return (
                        <option key={list.id}
                        value={list.id}
                        >{list.name}</option>
                    )
                })}
            </select>
        </form>
    )
}