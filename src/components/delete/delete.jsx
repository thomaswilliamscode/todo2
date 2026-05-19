import './delete.css'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { deleteItem, getData } from '../../db-logic/db-logic'
import {FolderContext} from '../../context/folderContext'
import {ListContext} from '../../context/listContext'
import {TodosContext} from '../../context/todosContext'


export default function Delete({todoId, listId}) {
    const { folders, setFolders } = useContext(FolderContext)
    const { lists, setLists } = useContext(ListContext)
    const { todos, setTodos } = useContext(TodosContext)
    //figure out if deleting a list, todo or folder
    let table = ''
    let id = ''
    

    async function onDelete() {
        if (todoId) {
            table = 'todos'
            id = todoId
        }
        if (listId) {
            table = 'lists'
            id = listId
            const listArray = JSON.parse(localStorage.getItem(table))
            const listInfo = listArray.find( (list) => list.id === listId)
            const listTodos = todos.filter( (todo) => todo.list_id === listInfo.id )
            // if list delete todos in list first 
            for ( let todoObj of listTodos) {
                const { id } = todoObj
                await deleteItem('todos', id)
            }
            let newTodos = await getData('todos')
            setTodos(newTodos)
            localStorage.setItem('todos', JSON.stringify(newTodos))
        }

        
        //delete it
        await deleteItem(table, id)

        //fetch new data
        const newData = await getData(table)

        //save newData to state
        if (table === 'todos') {
            setTodos(newData)
        }
        if(table === 'lists') {
            setLists(newData)
        }

        //save new data to localStorage
        localStorage.setItem(table, JSON.stringify(newData))
    }


    return (
        <>
            <button
            onClick={ () => onDelete()}
            >Delete</button>
        </>
    )
}