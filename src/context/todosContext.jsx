import { createContext, useState } from 'react'

export const TodosContext = createContext()

export function TodosProvider ({children}) {
    // const [ getLists, setGetLists ] = useState('got')
    const [ todos, setTodos ] = useState({})
    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    )
}