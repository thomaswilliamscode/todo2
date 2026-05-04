import './header.css'
import { Link } from 'react-router-dom'

export default function Header () {
    return (
        <nav>
            <ul>
                <li> <Link to='/'>Home</Link></li>
                <li> <Link to='/focus'>Focus Mode</Link></li>
            </ul>
        </nav>
    )
}