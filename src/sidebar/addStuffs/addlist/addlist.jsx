import { useState, useContext, useEffect } from 'react'
import { pushData, maxPosition, getData } from '../../../db-logic/db-logic'
import { ListContext } from '../../../context/listContext'
import { FolderContext } from '../../../context/folderContext'
import styles from './addlist.module.css'

const table = 'lists'

export default function AddList() {
  const { lists, setLists } = useContext(ListContext)
  const { folders, setFolders } = useContext(FolderContext)
  const [ listName, setListName ] = useState('')
  const [ activeFolder, setActiveFolder ] = useState('')

  const localLists = JSON.parse(localStorage.getItem('folders'))


    useEffect ( () => {
      if (folders.length > 0) {
        const first = folders[0]
        setActiveFolder(first.id)
      }
      
    }, [folders])

  async function formSubmit (e) {
    e.preventDefault()
    // // send list name to database
    const newData ={
      name:listName,
      folder_id: activeFolder
    }
    setListName('')
    let posObj = await maxPosition(table)
    if (posObj === null) {
      posObj = {
        position: -1
      }
    }
    const {position} = posObj
    newData.position = position + 1;
    await pushData(newData, table)
    const newListData = await getData('lists')
    setLists(newListData)
    localStorage.setItem('lists', JSON.stringify(newListData))

  }

  if (folders.length > 0) {
    return (
        <div>
            <form onSubmit={formSubmit}
              className={styles.form}
            >
              <p>Add A List</p>
              <div className= {styles.inputDiv}>
                <input 
                  className={styles.input}
                  type='text' 
                  value={listName}
                  onChange={(e) => setListName((e.target.value))}
                  placeholder='List Name'/>
                <input type='submit' value='Submit' className={styles.input}/>
                <select onChange={(e)=> setActiveFolder(e.target.value)}
                  
                >
                  
                  {folders && folders.map( (folder, index) => {
                    const { name, id} = folder;
                    return ( 
                      <div className={styles.optionDiv}>
                        <p>To The </p>
                        <option key={id}  value={id} className={styles.option}  >{name}</option>
                      </div>
                    )  
                  })}
                  
                </select>
              </div>
            </form>
        </div>
    )
  }
}