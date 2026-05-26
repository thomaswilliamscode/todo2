import { useEffect, useState } from 'react'
import Inbox from '../inbox/inbox'
import SidebarFolders from '../sidebarFolders/sidebarFolders'
import { Link } from 'react-router-dom'
import styles from './sidebarLayout.module.css'
import useFirstRender from '../../customHooks/useFirstRender'
import AddPage from '../../pages/addPage/addPage'
import AddFolder from '../addStuffs/addfolder/addfolder'
import AddList from '../addStuffs/addlist/addlist'
import AddTodo from '../addStuffs/addtodo/addtodo'

export default function SidebarLayout () {
    const [ open, setOpen ] = useState(false)

    function toggleHidden() {
        setOpen(!open)
    }
    useFirstRender()

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.topSidebar}>
                <div className={styles.flexContainer}>
                    <div className={styles.addContainer}>
                        <div className={styles.addHeader}>
                            <i
                                className={open
                                    ? "fa-solid fa-chevron-down"
                                    : "fa-solid fa-chevron-up"}
                                onClick={toggleHidden}
                            />
                            
                            <Link to='/addpage'>Add Stuffs</Link>
                        </div>
                        <span></span>

                        <ul className={open ? styles.shown : styles.hidden}>
                            <li className={styles.li}><AddFolder /></li>
                            <li className={styles.li}> <AddList /></li>
                            <li className={styles.li}> <AddTodo /></li>
                        </ul>
                    </div>
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