import { formSubmit } from './helpers'
import { useState } from 'react'

export default function AddFolder() {
  const [ folderName, setFolderName ] = useState('')

  function formSubmit(e) {
    e.preventDefault()
    // folder name needs to be submitted to database

    // setFolderName back to empty string
    
  }

  
    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type='text' placeholder='Folder Name'/>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}