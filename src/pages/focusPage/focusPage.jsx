import styles from './focusPage.module.css'
import {TodosContext} from '../../context/todosContext'
import { useState, useEffect, useContext} from 'react'
import Delete from '../../components/delete/delete'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import {InboxContext} from '../../context/inboxContext'

export default function FocusPage () {
    const { todos, setTodos } = useContext(TodosContext)
    const { inbox, setInbox } = useContext(InboxContext)
    const [ newList, setNewList] = useState([])
    const [currentList, setCurrentList] = useState([])

    useEffect(() => {
        const localInbox = JSON.parse(localStorage.getItem('inbox'))
        const localTodos = JSON.parse(localStorage.getItem('todos'))

        console.log('localInbox', localInbox);
        console.log('localTodos', localTodos);
        console.log(Array.isArray(localInbox));
        console.log(Array.isArray(localTodos));
        const combinedList = [...localInbox, ...localTodos]

        if (combinedList.length > 0) {
            const firstItem = combinedList[0]

            setCurrentList([firstItem])

            // remove first item
            setNewList(combinedList.slice(1))
        }
    }, [])

    function nextTask() {
        if (newList.length > 0) {
            setCurrentList([newList[0]])
            setNewList(newList.slice(1))
        } else {
            setCurrentList([])
        }
    }

    function skip () {
        
        nextTask()
        
    }
    return (
        <>
            <h1 className={styles.listTitle}>Focus Page</h1>
            <ul className={styles.ulContainer}>
                {currentList && currentList.map( (todo) => {
                    const { id, name} = todo
                    return (
                        <li 
                        className={styles.todo}
                        key={id}>
                            <span></span>
                            {name}
                            < Delete focusPageId={id}
                                onDeleteSuccess={nextTask}
                            />
                        </li>
                    )
                })}
                
            </ul>
            <div className={styles.addTodo}>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
                <button className={styles.skip}
                    onClick={ () => skip()}
                >Skip</button>
                <AddIndividualTodo inbox={'inbox'}/>
            </div>
        </>
    )
}