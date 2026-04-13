import { supabase } from '../supabase/supabase'
import { useState, useEffect } from 'react'
import { getData } from '../db-logic/db-logic'
import { NavLink } from "react-router-dom";

import './sidebarData.css'

export default function SidebarData () {
    const type = 'folders'
    const [ folders, setFolders ] = useState([])
    useEffect( () => {
        const value = localStorage.getItem('folders')
        if (!value) {
            const fetchFolders = async () => {
            const data = await getData(type);
            setFolders(data)
            localStorage.setItem('folders', JSON.stringify(data))
            }
        fetchFolders()
        } else {
            setFolders(JSON.parse(value))
        } 
        
    }, [])
    
    return (
        <>
            {folders && folders.map( (info) => {
                let { name, id } = info
                return (
                    <NavLink
                        key={id}
                        to={`/folder/${id}`}
                        end
                        className={({ isActive }) =>
                        isActive ? "sidebar-folder active" : "sidebar-folder"
                        }
                    >
                        <li key ={id}>{name}</li>
                    </NavLink>
                )
                })
            }
        </>
    )
}