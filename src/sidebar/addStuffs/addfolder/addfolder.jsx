import { useState, useContext } from 'react'
import { pushData, maxPosition, getData } from '../../../db-logic/db-logic'
import { FolderContext } from '../../../context/folderContext'
import styles from './addfolder.module.css'
import { capital } from '../../../helpers/helpers'

const table = 'folders'

export default function AddFolder() {
  const { getFolders, setGetFolders, setFolders } = useContext(FolderContext)
  const [ folderName, setFolderName ] = useState('')

  async function formSubmit (e) {
    e.preventDefault()
    console.log('submitting')
    // send folder name to database
    const newFolderName = capital(folderName)
    console.log(newFolderName)
    const newData ={
      name:newFolderName,
    }
    console.log(newData)
    setFolderName('')
    let posObj = await maxPosition(table)
    console.log(posObj)
    if (!posObj) {
      posObj = {
        position: -1
      }
    }
    const {position} = posObj
    newData.position = position + 1;

    const insertedFolder = await pushData(newData, table)

    setFolders(prev => [
      ...prev,
      insertedFolder
    ])
    localStorage.setItem('folders', JSON.stringify(newFolders))
  }
    return (
        <div>
            <form onSubmit={formSubmit}
              className={styles.form}
            >
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