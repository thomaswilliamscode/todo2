import styles from './listPage.module.css'
import {getData} from '../../db-logic/db-logic'
import {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {TodosContext} from '../../context/todosContext' 
import {FolderContext} from '../../context/folderContext.jsx' 
import {ListContext} from '../../context/listContext' 
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import Delete from '../../components/delete/delete.jsx'
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import SidebarFolders from '../../sidebar/sidebarFolders/sidebarFolders.jsx'
import { handleDragEnd } from '../../helpers/helpers.js'

export default function ListPage() {
    const { todos, setTodos } = useContext(TodosContext)
    const { folders, setFolders } = useContext(FolderContext)
    const { lists, setLists, } = useContext(ListContext)
    const { listId, folderId } = useParams()

    if (!todos || !lists) {
        return <div>Loading...</div>
    }
    let id = ''

    if (listId) {
        id = listId
    } else {
        id = folderId
    }

    let filteredTodos = todos.filter( (todo) => todo.list_id === id)
    let currentList = lists.find( (list) => list.id === id)

    useEffect( () => {
        filteredTodos = todos.filter( (todo) => todo.list_id === id)
        currentList = lists.find( (list) => list.id === id)
    }, [todos])

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


    return (
        <div>
            { currentList && (
                    <h1 className={styles.listName}>
                        {currentList.name}
                    </h1>
                )}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='todos'
                        type='todo'
                    >
                        { (provided ) => (

                            <ul className={styles.ulContainer}
                                ref ={provided.innerRef}
                                {...provided.droppableProps}
                            >

                            
                            { todos && filteredTodos.map( (todo, index) => {
                                return (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        { (provided) => (
                                            <div key={todo.id}
                                            className={styles.todoContainer}
                                            ref = {provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <li className={styles.todoItem}>
                                                <span></span>
                                                {todo.name}
                                                <Delete todoId={todo.id}/>
                                            </li>
                                            
                                        </div>
                                        )}
                                        
                                    </Draggable>
                                )
                            })}

                            {provided.placeholder}
                            
                        </ul>
                        
                        )}
                        
                </Droppable>
            </DragDropContext>
            <div className={styles.addTodo}>
                <AddIndividualTodo list={currentList}/>
            </div>
            
        </div>

    
    )
    
    
}