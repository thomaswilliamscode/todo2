import { supabase } from '../supabase/supabase'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { FolderContext } from '../../context/folderContext' 
import SidebarLists from '../sidebarLists/sidebarLists'

import './sidebarFolders.css'

export default function SidebarFolders () {
    
    const { getFolders, setGetFolders } = useContext(FolderContext)
    const type = 'folders'
    const { folders, setFolders } = useContext(FolderContext)
    const [ openFolders, setOpenFolders ] = useState(new Set())
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

    function toggleHidden (info) {
        setOpenFolders( prev => {
            const updated = new Set(prev)
            // if openFolders contains the obj, remove it
            if(updated.has(info.id)) {
                updated.delete(info.id)
            } else {
                //if it doesnt, then add it
                updated.add(info.id)
            }

            return updated
        })
        
        
    }

    function displayOpenFolders (folderId) {
        const filtered = folders.filter( (folderObj) => {
            console.log(openFolders.has(folderObj))
            console.log(openFolders)
            return openFolders.has(folderObj)
        })

        return filtered.map( (obj) => {
            console.log(obj)
        })
                        
    }
    
    return (
        <>
            {folders && folders.map( (info) => {
                let { name, id } = info
                return (
                    <div key={id} id='sidebar-folder-div'>
                        <div></div>
                        <i className="fa-solid fa-chevron-down"
                            onClick={() => toggleHidden(info)}
                        ></i>

                        <div className='folder-row'>
                        
                        <NavLink
                            to={`/folder/${id}`}
                            end
                            className={({ isActive }) =>
                            isActive ? "sidebar-folder active" : "sidebar-folder"
                            }
                        >
                            
                            
                            <li>{name}</li>
                      </NavLink>
                      {openFolders.has(id) && (
                        <SidebarLists info={info}/>
                      )}
                        
                        </div>
                        <div></div>
                    </div>
                    
                )
                })
            }
        </>
    )
}