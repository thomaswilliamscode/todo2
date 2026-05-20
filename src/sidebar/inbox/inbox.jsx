import { useContext } from 'react'
import {InboxContext} from '../../context/inboxContext'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import './inbox.css'
import Delete from '../../components/delete/delete'

export default function Inbox () {
    const {inbox, setInbox} = useContext(InboxContext)
    return (
        <div >
            <h1 className='list-title'>Inbox</h1>
            <ul className='ul-container'>
            {inbox && inbox.map( (todo) => {
                const { name, id } = todo
                return (
                    <li id='todo' key={id}>{name}
                    <Delete inboxId={todo.id}/>
                    </li>
                )
                
})}
           </ul>
           <AddIndividualTodo inbox={inbox}/>
        </div>
    )
}