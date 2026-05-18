import { useState, useContext, useEffect } from 'react'
import { pushData, maxPosition, getData } from '../../db-logic/db-logic'
import { ListContext } from '../../context/listContext'
import { FolderContext } from '../../context/folderContext'

const table = 'lists'

export default function AddList() {
  const { getLists, setGetLists } = useContext(ListContext)
  const { folders, setFolders } = useContext(FolderContext)
  const [ listName, setListName ] = useState('')
  const [ activeFolder, setActiveFolder ] = useState('')

  useEffect ( () => {
    const value = localStorage.getItem('folders')
    if(!activeFolder && value) { 
      const parsed = JSON.parse(value)
      const found = parsed.find( (folderObj) => {
        return folderObj.position === 0
      })
      const {id} = found
      setActiveFolder(id)
    }
  }, [])

  async function formSubmit (e) {
    e.preventDefault()
    // // send list name to database
    const newData ={
      name:listName,
      folder_id: activeFolder
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
                  onChange={(e) => setListName((e.target.value))}
                  placeholder='List Name'/>
                <input type='submit' value='Submit'/>
                <select onChange={(e)=> setActiveFolder(e.target.value)}>
                  {folders && folders.map( (folder, index) => {
                    const { name, id} = folder;
                    return (
                      <option key={id} value={id}>{name}</option>
                    )  
                  })}
                  
                </select>
            </form>
        </div>
    )
}