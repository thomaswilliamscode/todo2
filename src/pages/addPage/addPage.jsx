import styles from './addPage.module.css'
import AddFolder from '../../sidebar/addStuffs/addfolder/addfolder'
import AddList from '../../sidebar/addStuffs/addlist/addlist'
import AddTodo from '../../sidebar/addStuffs/addtodo/addtodo'

export default function AddPage () {
    return (
        <div className={styles.bigContainer}>
            <div className={styles.container}>
                <AddFolder />
            </div>
            <div className={styles.container}>
                <AddList />
            </div>
            <div className={styles.container}>
                <AddTodo />
            </div>
        </div>
    )
}