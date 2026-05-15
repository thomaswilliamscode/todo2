import { useEffect, useContext } from 'react'
import { getData } from '../db-logic/db-logic'
import {FolderContext} from '../context/folderContext'
import {ListContext} from '../context/listContext'
import {TodosContext} from '../context/todosContext'

export default function useFirstRender() {
    const { setFolders } = useContext(FolderContext)
    const { setLists } = useContext(ListContext)
    const { setTodos } = useContext(TodosContext)

    useEffect( () => {
        async function loadData() {
            let table = 'folders'
            // api call for folders
            const folders = await getData(table)

            setFolders(folders)
            localStorage.setItem('folders', JSON.stringify(folders))

            // api call for lists
            table = 'lists'
            const lists = await getData(table)

            setLists(lists)
            localStorage.setItem('lists', JSON.stringify(lists))

            // api call for todos
            table = 'todos'
            const todos = await getData(table)
            
            setTodos(todos)
            localStorage.setItem('todos', JSON.stringify(todos))
        }
        loadData()
    }, [])

    
}

