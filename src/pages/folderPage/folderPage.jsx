import { useParams } from 'react-router-dom';
import { getData } from '../../db-logic/db-logic'
import './folderPage.css'
import Todos from '../../components/todos/todos'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../context/listContext' 


export default function FolderPage ( ){
    const { lists, setLists } = useContext(ListContext)
    const type = 'lists'
    const [list, setList] = useState([])
    const { id: folderId } = useParams();

    let filtered = lists.filter( (list) => {
        return list.folder_id === folderId
    })

    useEffect ( () => {
        filtered = lists.filter( (list) => {
        return list.folder_id === folderId
        })
    }, [lists])


    

    return (
        <div>
            {list && filtered.map( (list) => { 
                const {id: listId, name, folder_id} = list
                return (
                    <div key={name}>
                        <div className='list-name'>
                            <h1>{name}</h1>
                        </div>
                        <div>
                            <Todos listId={listId}/>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
}