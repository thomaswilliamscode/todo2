import { useEffect } from 'react'
import Inbox from '../inbox/inbox'
import SidebarFolders from '../sidebarFolders/sidebarFolders'
import { Link } from 'react-router-dom'
import styles from './sidebarLayout.module.css'
import AddList from '../../sidebar/addStuffs/addlist/addlist'
import AddFolder from '../../sidebar/addStuffs/addfolder/addfolder'
import useFirstRender from '../../customHooks/useFirstRender'
import AddPage from '../../pages/addPage/addPage'

export default function SidebarLayout () {

    useFirstRender()

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.topSidebar}>
                <div className={styles.addContainer}>  
                    <Link to='/addpage'>Add Stuffs</Link>
                </div>
                <div className={styles.inboxContainer}>
                    <Link to='/inbox'>Inbox</Link>
                </div>
                
            </div>
            <div className={styles.bottomSidebar}>
                <SidebarFolders />
            </div>
            
        </div>
    )
}