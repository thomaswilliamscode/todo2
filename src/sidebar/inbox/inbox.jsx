import { useContext } from 'react'
import {InboxContext} from '../../context/inboxContext'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import styles from './inbox.module.css'
import Delete from '../../components/delete/delete'

export default function Inbox () {
    const {inbox, setInbox} = useContext(InboxContext)
    return (
        <div >
            <h1 className={styles.listName}>Inbox</h1>
            <ul className={styles.ulContainer}>
            {inbox && inbox.map( (todo) => {
                const { name, id } = todo
                return (
                    <div className={styles.todoContainer}>
                        <li className={styles.todo} key={id}>
                            <span></span>
                            {name}
                            <Delete inboxId={todo.id}/>
                        </li>
                    </div>
                )
                
})}
           </ul>
           <div className={styles.addTodo}>
                <AddIndividualTodo inbox={inbox} />
           </div>
        </div>
    )
}