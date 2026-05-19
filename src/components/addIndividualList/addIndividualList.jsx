import './addIndividualList.css'
import { useState, useContext } from 'react'
import { getData, pushData, maxPosition } from '../../db-logic/db-logic'
import {ListContext} from '../../context/listContext'

export default function AddIndividualList ({folderId}) {
    const [ input, setInput] = useState('')
    const { lists, setLists } = useContext(ListContext)


    async function submitForm (e) {
        let table ='lists'
        e.preventDefault()
        // create data to push 
        let newList = {
            folder_id: folderId,
            name: input,
        }
        // set input to empty 
        setInput('')

        // get position data
        let pos = await maxPosition(table)

        if(pos === null){
            pos = {
                position: -1
            }
        }

        newList.position = pos.position + 1

        // push new list to DB
        await pushData(newList, table)

        // get new List Data, save to context
        let newData = await getData(table)
        setLists(newData)

        // save new List Data to local storage 
        localStorage.setItem(table, JSON.stringify(newData))
    }
    return (
        <form onSubmit={(e) => submitForm(e)}>
            <input type='text'
            placeholder='List Name'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <input type='submit'/>
        </form>
    )
}