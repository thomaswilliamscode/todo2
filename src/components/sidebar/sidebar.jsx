import Add from '../add-folder-or-list/add-folder-or-list'
import Inbox from '../inbox/inbox'
import SidebarData from '../sidebarData/sidebarData'
import { Link } from 'react-router-dom'

export default function Sidebar () {
    return (
        <div>
            <Link to='/add'>Add</Link>
            <Link to='/inbox'>Inbox</Link>
            <SidebarData />
        </div>
    )
}