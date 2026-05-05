import { useState } from 'react'
import { pushData, maxPosition } from '../db-logic/db-logic'

const table = 'folders'

export default function AddFolder() {
  const [ folderName, setFolderName ] = useState('')
  async function formSubmit (e) {
    e.preventDefault()
    // send folder name to database
    let posObj = await maxPosition(table)
    const {position} = posObj
    const newData = {
      name: folderName,
      position: position + 1
    }
    console.log(posObj)
    await pushData(newData, table)
    // reset folderName to empty 
    setFolderName('')
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