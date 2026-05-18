import './addPage.css'
import AddFolder from '../../components/addfolder/addfolder'
import AddList from '../../components/addlist/addlist'
import AddTodo from '../../components/addtodo/addtodo'

export default function AddPage () {
    return (
        <div>
            <AddFolder />
            <AddList />
            <AddTodo />
        </div>
    )
}