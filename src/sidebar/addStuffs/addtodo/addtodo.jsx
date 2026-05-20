import './addtodo.css'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../../context/listContext'
import { TodosContext } from '../../../context/todosContext'
import { pushData, maxPosition, getData } from '../../../db-logic/db-logic'

export default function AddTodo () {
    const { lists } = useContext(ListContext)
    const { todos, setTodos } = useContext(TodosContext)
    const [ input, setInput ] = useState([])
    const [ activeList, setActiveList ] = useState('')
    const [ inbox, setInbox ] = useState('inbox')

    const localLists = JSON.parse(localStorage.getItem('lists'))

    useEffect( () => {
        if(localLists.length > 0) {
            const first = localLists[0]
            setActiveList(first.id)
        }
        
    }, [])
    
    async function handleSubmit(e) {
        e.preventDefault()
        // add input to that list 
        const table ='todos'
        const newTodo={
            name: input,
            list_id: activeList,
        }

        // set input to empty 
        setInput('')
        const pos = await maxPosition(table)
        newTodo.position = pos.position + 1
        
        await pushData(newTodo, table)
        // get data from api again
        const newTodos = await getData(table)
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))

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
                {lists && lists.map( (list) => {
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