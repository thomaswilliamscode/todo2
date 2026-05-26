import { createContext, useState } from 'react'

export const TodosContext = createContext()

export function TodosProvider ({children}) {
    const [ todos, setTodos ] = useState([])
    return (
        <TodosContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodosContext.Provider>
    )
}