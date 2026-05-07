import { useState, useContext } from 'react'
import { pushData, maxPosition, getData } from '../db-logic/db-logic'
import { ListContext } from '../../context/listContext'

const table = 'lists'

export default function AddList() {
  const { getLists, setGetLists } = useContext(ListContext)
  const [ listName, setListName ] = useState('')

  async function formSubmit (e) {
    e.preventDefault()
    // // send list name to database
    const newData ={
      name:listName,
    }
    setListName('')
    let posObj = await maxPosition(table)
    const {position} = posObj
    newData.position = position + 1;
    await pushData(newData, table)
    // reset listName to empty 
    setGetLists('get')
    // since im already adding a new list to a folder here, 
    // i should go ahead and run a get request to that specific list,
    // and save that to local storage or context that then saves to local storage.  
}
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type='text' 
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder='List Name'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}