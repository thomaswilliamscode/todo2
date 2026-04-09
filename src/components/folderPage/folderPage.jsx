import { useParams } from 'react-router-dom';
import { getListAndTodos } from './helpers'
import './folderPage.css'

import { useState, useEffect } from 'react'


export default function FolderPage ( ){
    const [list, setList] = useState([])
    const { id: folderId } = useParams();

    useEffect ( () => {
        console.log(list)
        if (list.length === 0) {
            const listData = async () => {
                try {
                    const data = await getListAndTodos()
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
        const {listId, name, folder_id} = list
        return folder_id === folderId
    })
    return (
        <>
            {list && filtered.map( (list) => {
                const {listId, name, folder_id} = list
                return (
                    <>
                        <li className='list-name' key={listId}>{name}</li>
                    </>
                )
            })}
        </>
    )
}