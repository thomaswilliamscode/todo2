import './delete.css'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { deleteItem, getData } from '../../db-logic/db-logic'
import {FolderContext} from '../../context/folderContext'
import {ListContext} from '../../context/listContext'
import {TodosContext} from '../../context/todosContext'
import {InboxContext} from '../../context/inboxContext'


export default function Delete({todoId, listId, folderId, inboxId}) {
    const { folders, setFolders } = useContext(FolderContext)
    const { lists, setLists } = useContext(ListContext)
    const { todos, setTodos } = useContext(TodosContext)
    const { inbox, setInbox } = useContext(InboxContext)
    //figure out if deleting a list, todo or folder
    let table = ''
    let id = ''
    

    async function onDelete() {
        if (inboxId) {
            table='inbox'
            id = inboxId
        }
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
        if (folderId) {
            table = 'folders'
            id = folderId
            const foldersArray = JSON.parse(localStorage.getItem(table))
            const folderInfo = foldersArray.find( (folder) => folder.id === folderId)
            const folderLists = lists.filter( (list) => list.folder_id === folderInfo.id)
            let listTodos = [];
            for (let list of folderLists) {
                const todoFilter = todos.filter( (todo) => todo.list_id === list.id)
                listTodos.push(...todoFilter)
            }
            for (let todo of listTodos) {
                await deleteItem('todos', todo.id)
            }
            let newTodos = await getData('todos')
            setTodos(newTodos)
            localStorage.setItem('todos', JSON.stringify(newTodos))

            for (let list of folderLists) {
                await deleteItem('lists', list.id)
            }
            let newLists = await getData('lists')
            setLists(newLists)
            localStorage.setItem('lists', JSON.stringify(newLists))
            
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

        if (table === 'folders') {
            setFolders(newData)
        }

        if (table === 'inbox') {
            setInbox(newData)
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