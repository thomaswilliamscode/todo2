import { useParams } from 'react-router-dom';
import { getData } from '../../db-logic/db-logic'
import './folderPage.css'
import Todos from '../../components/todos/todos'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../context/listContext' 
import { FolderContext } from '../../context/folderContext.jsx'
import AddIndividualTodo from '../../components/addIndividualTodo/addIndividualTodo'
import AddIndividualList from '../../components/addIndividualList/addIndividualList'
import Delete from '../../components/delete/delete.jsx'


export default function FolderPage ( ){
    const { lists, setLists } = useContext(ListContext)
    const { folders, setFolders } = useContext(FolderContext)
    const type = 'lists'
    const [list, setList] = useState([])
    const { folderId } = useParams();

    const localFolders = JSON.parse(localStorage.getItem('folders'))
    let folder = localFolders.find( (folder) => folder.id === folderId)

    useEffect( () => {

    }, [localFolders])


    let filtered = lists.filter( (list) => {
        return list.folder_id === folderId
    })

    useEffect ( () => {
        if (lists.length > 0) {
            filtered = lists.filter( (list) => {
            return list.folder_id === folderId
        })
        }
        
        
    }, [lists])

    if (filtered.length !== 0 && folders.length !== 0) {
        return (
        <div>
            {list && filtered.map( (list) => { 
                const {id: listId, name, folder_id} = list
                return (
                    <div key={listId}>
                        <div className='list-name'>
                            <h1>{name}</h1>
                            
                        </div>
                        <div>
                            <Todos listId={listId}/>
                        </div>
                        < AddIndividualTodo list={list}/>
                    </div>
                    
                )
            }
            )}
            <div>
                <AddIndividualList folderId={folderId}/>
            </div>
        </div>
    )
    } else if (folders.length === 1 && folder !== undefined) {
        const {name} = folder
        return (
            <>
                <h1>{name}</h1>
                <AddIndividualList folderId={folderId} />
            </>
        )
    }



}