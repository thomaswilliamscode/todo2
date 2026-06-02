import { useParams } from 'react-router-dom';
import { getData } from '../../db-logic/db-logic'
import styles from './folderPage.module.css'
import Todos from '../../components/todos/todos'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../context/listContext' 
import { TodosContext } from '../../context/todosContext' 
import { FolderContext } from '../../context/folderContext.jsx'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import AddIndividualList from '../../components/addIndividualList/addIndividualList'
import Delete from '../../components/delete/delete.jsx'
import {handleDragEnd} from '../../helpers/helpers.js'
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";


export default function FolderPage ( ){
    const { lists, setLists } = useContext(ListContext)
    const { folders, setFolders } = useContext(FolderContext)
    const { todos, setTodos } = useContext(TodosContext)
    const type = 'lists'
    const [list, setList] = useState([])
    const { folderId } = useParams();

    const localFolders = JSON.parse(localStorage.getItem('folders'))
    let folder = localFolders.find( (folder) => folder.id === folderId)

    useEffect( () => {

    }, [localFolders])


    let filtered = lists.filter( (list) => {
        return list.folder_id === folderId
    })

    useEffect ( () => {
        if (lists.length > 0) {
            filtered = lists.filter( (list) => {
            return list.folder_id === folderId
        })
        }
        
        
    }, [lists])

    function onDragEnd(result) {
                const { type } = result
                let table;
                let getter;
                let setter;
                if (type === 'todo') {
                    table = 'todos'
                    getter = todos.map( item => ({...item}))
                    setter = setTodos
                }
                handleDragEnd(result, table, getter, setter)
            }

    if (filtered.length !== 0 && folders.length !== 0) {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.container}>
                    {filtered.map( (list) => { 
                        const {id: listId, name, folder_id} = list
                        return (
                            <Droppable key={listId}
                                droppableId={String(listId)}
                                type="todo"
                            >
                                { (provided ) => (
                                    <div className={styles.container}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                >
                                        <div className={styles.listName}>
                                            <h1>{name}</h1>
                                            
                                        </div>
                                        <div className={styles.todosContainer}>
                                            <Todos listId={listId}/>
                                        </div>
                                        <div className={styles.addTodo}>
                                            < AddIndividualTodo list={list}/>
                                        </div>
                                        {provided.placeholder}
                                    </div>
                                )}
                                
                            </Droppable>
                            
                        )
                    })}
                    <div className={styles.addList}>
                        <AddIndividualList folderId={folderId}/>
                    </div>
            </div>
        </DragDropContext>
    )
    } else if (folders.length === 1 && folder !== undefined) {
        const {name} = folder
        return (
            <>
                <h1>{name}</h1>
                <AddIndividualList folderId={folderId} />
            </>
        )
    }



}