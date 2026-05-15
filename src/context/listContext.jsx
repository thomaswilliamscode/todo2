import { createContext, useState } from 'react'

export const ListContext = createContext()

export function ListProvider ({children}) {
    const [ getLists, setGetLists ] = useState('got')
    const [ lists, setLists ] = useState({})
    return (
        <ListContext.Provider value={{lists, setLists}}>
            {children}
        </ListContext.Provider>
    )
}