import Add from '../add-folder-or-list/add-folder-or-list'
import Inbox from '../inbox/inbox'
import SidebarData from '../sidebarData/sidebarData'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar () {
    return (
        <div id='container'>
            <Link to='/'>Add</Link>
            <Link to='/inbox'>Inbox</Link>
            <SidebarData />
        </div>
    )
}