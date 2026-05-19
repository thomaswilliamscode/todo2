import './addPage.css'
import AddFolder from '../../sidebar/addStuffs/addfolder/addfolder'
import AddList from '../../sidebar/addStuffs/addlist/addlist'
import AddTodo from '../../sidebar/addStuffs/addtodo/addtodo'

export default function AddPage () {
    return (
        <div>
            <AddFolder />
            <AddList />
            <AddTodo />
        </div>
    )
}