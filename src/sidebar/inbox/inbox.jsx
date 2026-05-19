import { useContext } from 'react'
import {InboxContext} from '../../context/inboxContext'

export default function Inbox () {
    const {inbox} = useContext(InboxContext)
    return (
        <div>
            <h1>Inbox</h1>
            <ul>
            {inbox && inbox.map( (todo) => {
                const { name, id } = todo
                return (
                    <li key={id}>{name}</li>
                )
                
})}
           </ul>
        </div>
    )
}