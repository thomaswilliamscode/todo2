import { supabase } from '../../components/supabase/supabase'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { FolderContext } from '../../context/folderContext' 
import { ListContext } from '../../context/listContext' 
import { TodosContext } from '../../context/todosContext' 
import SidebarLists from '../sidebarLists/sidebarLists'
import Delete from '../../components/delete/delete'
import { handleDragEnd } from '../../helpers/helpers'
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import styles from './sidebarFolders.module.css'

export default function SidebarFolders () {
    
    const type = 'folders'
    const { folders, setFolders } = useContext(FolderContext)
    const { lists, setLists } = useContext(ListContext)
    const { todos, setTodos } = useContext(TodosContext)
    const [ openFolders, setOpenFolders ] = useState([])

    function toggleHidden(id) {
        setOpenFolders(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    function onDragEnd(result) {
        const { type } = result
        let table;
        let getter;
        let setter;
        if (type === 'folder') {
            table = 'folders'
            getter = folders.map( item => ({...item}))
            setter = setFolders
        }
        if (type === 'list') {
            table = 'lists'
            getter = lists.map( item => ({...item}))
            setter = setLists
            
        }
        if (type === 'todo') {
            table = 'todos'
            getter = todos.map( item => ({...item}))
            setter = setTodos
        }
        handleDragEnd(result, table, getter, setter)
    }
    
    return (
        <div className={styles.container}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='folders'
                    type='folder'
                >
                    { (provided) => (
                        <div className={styles.containerDiv}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                            {folders.map((info, index) => {
                                const { name, id } = info;

                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={styles.sidebarFolderDiv}
                                        >
                                        <div className={styles.folderRow}>
                                            
                                            {openFolders.includes(id) ? (
                                            <i
                                                className="fa-solid fa-chevron-down"
                                                onClick={() => toggleHidden(id)}
                                            />
                                            ) : (
                                            <i
                                                className="fa-solid fa-chevron-up"
                                                onClick={() => toggleHidden(id)}
                                            />
                                            )}

                                            <NavLink
                                            to={`/folder/${id}`}
                                            end
                                            className={styles.link}
                                            >
                                            {name}
                                            </NavLink>

                                            <span className={styles.deleteButton}>
                                            <Delete folderId={id} />
                                            </span>
                                        </div>

                                        {openFolders.includes(id) && (
                                            <div className={styles.openLists}>
                                            <SidebarLists info={info} />
                                            </div>
                                        )}
                                        </div>
                                    )}
                                    </Draggable>
                                );
                                })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}