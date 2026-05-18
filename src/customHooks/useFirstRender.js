import { useEffect, useContext } from 'react'
import { getData } from '../db-logic/db-logic'
import {FolderContext} from '../context/folderContext'
import {ListContext} from '../context/listContext'
import {TodosContext} from '../context/todosContext'
import {InboxContext} from '../context/inboxContext'

export default function useFirstRender() {
    const { setFolders } = useContext(FolderContext)
    const { setLists } = useContext(ListContext)
    const { setTodos } = useContext(TodosContext)
    const { setInbox } = useContext(InboxContext)

    useEffect( () => {
        async function loadData() {
            let table = 'folders'
            // api call for folders
            const folders = await getData(table)
            setFolders(folders)

            // api call for lists
            table = 'lists'
            const lists = await getData(table)
            setLists(lists)

            // api call for todos
            table = 'todos'
            const todos = await getData(table)  
            setTodos(todos)

            // api call for inbox
            table = 'inbox'
            const inbox = await getData(table)  
            setInbox(inbox)
        }
        loadData()
    }, [])

    
}

