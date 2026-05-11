import './sidebarLists.css'
import {useState, useEffect, useContext} from 'react'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import {ListContext} from '../../context/listContext'

export default function SidebarLists (props) {
    const {listIds, setListIds} = useContext(ListContext)
    const [ lists, setLists ] = useState([])
    const {id, name, position} = props.info
    const table = 'lists'
    useEffect( () => {
        async function fetchData() {
            const lists = await getData(table, id)
            lists.map ( (list) => {
                const {id: list_id, } = list
                console.log(list)
            }) 
            setLists(lists)

            
        }
        fetchData()

        
        
    }, [id])
    console.log(listIds)
    return (
        <ul id='list-container'>
            {lists && lists.map( (list) => {
                const { name, id } = list
                return (
                    <NavLink
                    key={id}
                    to={`/list/${id}`}
                    >
                    <li> {name}</li>
                    </NavLink>
                )
            })}
        </ul>
    )
}