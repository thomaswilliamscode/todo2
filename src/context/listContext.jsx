import { createContext, useState } from 'react'

export const ListContext = createContext()

export function ListProvider ({children}) {
    const [ getLists, setGetLists ] = useState('got')
    const [ listIds, setListIds ] = useState({})
    return (
        <ListContext.Provider value={{listIds, setListIds}}>
            {children}
        </ListContext.Provider>
    )
}