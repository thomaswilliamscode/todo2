import { createContext, useState } from 'react'

export const FolderContext = createContext()

export function FolderProvider ({children}) {
    const [ getFolders, setGetFolders ] = useState('got')
    return (
        <FolderContext.Provider value={{getFolders, setGetFolders}}>
            {children}
        </FolderContext.Provider>
    )
}