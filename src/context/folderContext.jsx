import { createContext, useState } from 'react'

export const FolderContext = createContext()

export function FolderProvider ({children}) {
    const [ getFolders, setGetFolders ] = useState('got')
    const [ folders, setFolders ] = useState([])
    return (
        <FolderContext.Provider value={
            {
                getFolders, 
                setGetFolders, 
                folders, 
                setFolders}
            }>
            {children}
        </FolderContext.Provider>
    )
}