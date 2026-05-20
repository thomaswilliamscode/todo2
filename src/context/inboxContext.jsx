import { createContext, useState } from 'react'

export const InboxContext = createContext()

export function InboxProvider ({children}) {
    const [ inbox, setInbox ] = useState([])
    return (
        <InboxContext.Provider value={{inbox, setInbox}}>
            {children}
        </InboxContext.Provider>
    )
}