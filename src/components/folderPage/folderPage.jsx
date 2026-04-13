import { useParams } from 'react-router-dom';
import { getData } from '../db-logic/db-logic'
import './folderPage.css'
import Todos from '../todos/todos'

import { useState, useEffect } from 'react'


export default function FolderPage ( ){
    const type = 'lists'
    const [list, setList] = useState([])
    const { id: folderId } = useParams();

    useEffect ( () => {
        if (list.length === 0) {
            const listData = async () => {
                try {
                    const data = await getData(type)
                    setList(data)
                    localStorage.setItem('lists', JSON.stringify(data))
                } catch (err) {
                    console.error(err)
                }
            } 
            listData()
        } else {
            const value = localStorage.getItem('lists')
            setList(JSON.parse(value))
        }

    }, [])

    const filtered = list.filter( (list) => {
        const {folder_id} = list
        return folder_id === folderId
    })
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