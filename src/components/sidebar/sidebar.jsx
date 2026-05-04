import Inbox from '../inbox/inbox'
import SidebarData from '../sidebarData/sidebarData'
import { Link } from 'react-router-dom'
import './sidebar.css'
import AddList from '../addlist/addlist'
import AddFolder from '../addfolder/addfolder'

export default function Sidebar () {
    return (
        <div id='container'>
            <div id='add'>
                <Link to='/addlist'>Add List</Link>
                <Link to='/addfolder'>Add Folder</Link>
            </div>
            <Link to='/inbox'>Inbox</Link>
            <SidebarData />
        </div>
    )
}