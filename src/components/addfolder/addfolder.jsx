import { useState, useContext } from 'react'
import { pushData, maxPosition } from '../db-logic/db-logic'
import { FolderContext } from '../../context/folderContext'

const table = 'folders'

export default function AddFolder() {
  const { getFolders, setGetFolders } = useContext(FolderContext)
  const [ folderName, setFolderName ] = useState('')

  async function formSubmit (e) {
    e.preventDefault()
    // send folder name to database
    const newData ={
      name:folderName,
    }
    setFolderName('')
    let posObj = await maxPosition(table)
    const {position} = posObj
    newData.position = position + 1;
    await pushData(newData, table)
    // reset folderName to empty 
    setGetFolders('get')

  }
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type='text' 
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder='Folder Name'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}