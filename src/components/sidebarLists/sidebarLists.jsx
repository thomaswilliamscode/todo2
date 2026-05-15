import './sidebarLists.css'
import {useState, useEffect, useContext} from 'react'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import {ListContext} from '../../context/listContext'

export default function SidebarLists (props) {
    const {lists, setLists} = useContext(ListContext)
    const [ allLists, setAllLists ] = useState([])
    const [ showingLists, setShowingLists ] = useState([])
    const {id, name, position} = props.info
    const table = 'lists'

    useEffect( () => {
        let localLists = JSON.parse(localStorage.getItem('lists'))
        setAllLists(localLists)
    }, [])

    const listFilter = allLists.filter( (list) => list.folder_id === id)
    return (
        <ul id='list-container'>
            {lists && listFilter.map( (list) => {
                    return (
                    <NavLink
                    key={list.id}
                    to={`/list/${id}`}
                    >
                    <li> {list.name}</li>
                    </NavLink>
                )
            })}
        </ul>
    )
}