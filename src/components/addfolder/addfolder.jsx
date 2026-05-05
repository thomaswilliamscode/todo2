import { useState } from 'react'

export default function AddFolder() {
  const [ folderName, setFolderName ] = useState('')
  function formSubmit (e) {
    e.preventDefault()
    // send folder name to database

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