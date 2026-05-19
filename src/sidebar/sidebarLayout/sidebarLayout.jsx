import { useEffect } from 'react'
import Inbox from '../inbox/inbox'
import SidebarFolders from '../sidebarFolders/sidebarFolders'
import { Link } from 'react-router-dom'
import './sidebarLayout.css'
import AddList from '../../sidebar/addStuffs/addlist/addlist'
import AddFolder from '../../sidebar/addStuffs/addfolder/addfolder'
import useFirstRender from '../../customHooks/useFirstRender'
import AddPage from '../../pages/addPage/addPage'

export default function SidebarLayout () {

    useFirstRender()

    return (
        <div id='container'>
            <div id='add'>  
                <Link to='/addpage'>Add Stuffs</Link>
            </div>
            <Link to='/inbox'>Inbox</Link>
            <SidebarFolders />
        </div>
    )
}