import styles from './sidebarLists.module.css'
import {useState, useEffect, useContext} from 'react'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import {ListContext} from '../../context/listContext'
import Delete from '../../components/delete/delete'

export default function SidebarLists (props) {
    const {lists, setLists} = useContext(ListContext)
    const [ showingLists, setShowingLists ] = useState([])
    const {id, name, position} = props.info
    const table = 'lists'

    let listFilter = lists.filter( (list) => list.folder_id === id)

    useEffect( () => {
        listFilter = lists.filter( (list) => list.folder_id === id)
    }, [lists])

    return (
        <ul className={styles.listContainer}>
            {lists && listFilter.map( (list) => {
                    return (
                    <NavLink
                    key={list.id}
                    to={`/list/${list.id}`}
                    >
                    <li className={styles.sidebarListsLi}> {list.name}<Delete listId={list.id}/></li>
                    </NavLink>
                )
            })}
        </ul>
    )
}