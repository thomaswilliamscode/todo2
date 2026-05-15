import { useEffect } from 'react'
import Inbox from '../inbox/inbox'
import SidebarFolders from '../sidebarFolders/sidebarFolders'
import { Link } from 'react-router-dom'
import './sidebar.css'
import AddList from '../addlist/addlist'
import AddFolder from '../addfolder/addfolder'
import useFirstRender from '../../customHooks/useFirstRender'

export default function Sidebar () {

    useFirstRender()

    return (
        <div id='container'>
            <div id='add'>
                <Link to='/addlist'>Add List</Link>
                <Link to='/addfolder'>Add Folder</Link>
            </div>
            <Link to='/inbox'>Inbox</Link>
            <SidebarFolders />
        </div>
    )
}