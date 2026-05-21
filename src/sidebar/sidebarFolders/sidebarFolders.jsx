import { supabase } from '../../components/supabase/supabase'
import { getData } from '../../db-logic/db-logic'
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { FolderContext } from '../../context/folderContext' 
import SidebarLists from '../sidebarLists/sidebarLists'
import Delete from '../../components/delete/delete'

import styles from './sidebarFolders.module.css'

export default function SidebarFolders () {
    
    const { getFolders, setGetFolders } = useContext(FolderContext)
    const type = 'folders'
    const { folders, setFolders } = useContext(FolderContext)
    const [ openFolders, setOpenFolders ] = useState([])

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

    function toggleHidden(id) {
        setOpenFolders(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }
    
    return (
        <div className={styles.container}>
            {folders.length > 0 && folders.map( (info) => {
                let { name, id } = info
                return (
                    <div key={id} className={styles.sidebarFolderDiv}>

                        <div className={styles.folderRow}>
                            
                            {openFolders.includes(id) ? 
                                (<i
                                className="fa-solid fa-chevron-down"
                                onClick={() => toggleHidden(id)}
                            />) :  (<i
                                className="fa-solid fa-chevron-up"
                                onClick={() => toggleHidden(id)}
                            />)}
                            

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
                    
                )
                })
            }
        </div>
    )
}