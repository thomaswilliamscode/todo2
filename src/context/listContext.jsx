import { createContext, useState } from 'react'

export const ListContext = createContext()

export function ListProvider ({children}) {
    const [ getLists, setGetLists ] = useState('got')
    return (
        <ListContext.Provider value={{getLists, setGetLists}}>
            {children}
        </ListContext.Provider>
    )
}