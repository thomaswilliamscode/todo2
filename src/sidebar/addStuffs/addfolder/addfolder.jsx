import { useState, useContext } from 'react'
import { pushData, maxPosition, getData } from '../../../db-logic/db-logic'
import { FolderContext } from '../../../context/folderContext'
import styles from './addfolder.module.css'

const table = 'folders'

export default function AddFolder() {
  const { getFolders, setGetFolders, setFolders } = useContext(FolderContext)
  const [ folderName, setFolderName ] = useState('')

  async function formSubmit (e) {
    e.preventDefault()
    // send folder name to database
    const newData ={
      name:folderName,
    }
    setFolderName('')
    let posObj = await maxPosition(table)
    if (posObj === null) {
      posObj = {
        position: -1
      }
    }
    const {position} = posObj
    newData.position = position + 1;
    await pushData(newData, table)
    let newFolders = await getData(table)
    setFolders(newFolders)
    localStorage.setItem('folders', JSON.stringify(newFolders))
  }
    return (
        <div>
            <form onSubmit={formSubmit}
              className={styles.form}
            >
              <p>Add A New Folder</p>
              <div className={styles.inputDiv}>
                <input 
                  className={styles.input}
                  type='text' 
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder='Folder Name'/>
                  <input 
                    className={styles.input}
                    type='submit' 
                    value='Submit'
                  />
                </div>
            </form>
        </div>
    )
}