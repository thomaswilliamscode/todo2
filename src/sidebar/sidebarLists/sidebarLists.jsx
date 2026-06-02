import styles from './sidebarLists.module.css'
import {useState, useEffect, useContext} from 'react'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import {ListContext} from '../../context/listContext'
import Delete from '../../components/delete/delete'
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function SidebarLists (props) {
    const {lists, setLists} = useContext(ListContext)
    const [ showingLists, setShowingLists ] = useState([])
    const {id, name, position} = props.info
    const table = 'lists'

    const listFilter = lists.filter( (list) => list.folder_id === id)


    return (
        
        <Droppable droppableId={`lists-${id}`}
            type='list'
        >
            { (provided) => (
                <ul className={styles.listContainer}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {lists && listFilter.map( (list, index) => {
                            return (
                                <Draggable
                                    key={list.id}
                                    draggableId={String(list.id)}
                                    index={index}
                                    >
                                    {(provided) => (
                                        <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={styles.sidebarListsLi}
                                        >
                                        <NavLink to={`/list/${list.id}`}>
                                            {list.name}
                                        </NavLink>

                                        <Delete listId={list.id} />
                                        </li>
                                    )}
                                </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </ul>
            )}
                
            
        </Droppable>
        
    )
}