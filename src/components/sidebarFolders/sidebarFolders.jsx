import { supabase } from '../supabase/supabase'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { FolderContext } from '../../context/folderContext' 
import SidebarLists from '../sidebarLists/sidebarLists'

import './sidebarFolders.css'

export default function SidebarFolders () {
    const [ hidden,isHidden ] = useState(true)
    const { getFolders, setGetFolders } = useContext(FolderContext)
    const type = 'folders'
    const { folders, setFolders } = useContext(FolderContext)
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

    useEffect( () => {
        if (getFolders === 'get') {
            const fetchFolders = async () => {
            const data = await getData(type);
            setFolders(data)
            localStorage.setItem('folders', JSON.stringify(data))
            setGetFolders('got')
            }
        fetchFolders()
        }
    }, [getFolders])
    
    return (
        <>
            {folders && folders.map( (info) => {
                let { name, id } = info
                const isHidden = true
                return (
                    <div key={id} id='sidebar-folder-div'>
                        <NavLink
                            to={`/folder/${id}`}
                            end
                            className={({ isActive }) =>
                            isActive ? "sidebar-folder active" : "sidebar-folder"
                            }
                        >
                            <div><i class="fa-solid fa-chevron-down"></i></div>
                            
                            <li>{name}</li>
                      </NavLink>
                        <SidebarLists info={info} isHidden={isHidden}/>
                    </div>
                    
                )
                })
            }
        </>
    )
}