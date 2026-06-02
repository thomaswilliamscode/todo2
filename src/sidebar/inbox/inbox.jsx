import { useContext } from 'react'
import {InboxContext} from '../../context/inboxContext'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import styles from './inbox.module.css'
import Delete from '../../components/delete/delete'
import {handleDragEnd} from '../../helpers/helpers'
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";




export default function Inbox () {
    const {inbox, setInbox} = useContext(InboxContext)
    function onDragEnd(result) {
                const { type } = result
                let table;
                let getter;
                let setter;
                if (type === 'inbox') {
                    table = 'inbox'
                    getter = inbox.map( item => ({...item}))
                    setter = setInbox
                }
                handleDragEnd(result, table, getter, setter)
            }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`inbox`}
                        type='inbox'
                    >
                        { (provided) => (
                            <div 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            > 
                                <h1 className={styles.listName}>Inbox</h1>
                                <ul className={styles.ulContainer}>
                                    {inbox && inbox.map( (todo, index) => {
                                        const { name, id } = todo
                                        return (
                                            <Draggable
                                                key={id}
                                                draggableId={id}
                                                index={index}
                                            >
                                                { (provided) => (
                                                    <div className={styles.todoContainer}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <li className={styles.todo}>
                                                            <span></span>
                                                            {name}
                                                            <Delete inboxId={todo.id}/>
                                                        </li>
                                                    </div>
                                                ) }
                                                
                                            </Draggable>
                                        )
                                        
                                    })}
                                     {provided.placeholder}
                                </ul>
                                <div className={styles.addTodo}>
                                        <AddIndividualTodo inbox={inbox} />
                                </div>
                            </div>
                        )}
                
            </Droppable>
        </DragDropContext>
    )
}