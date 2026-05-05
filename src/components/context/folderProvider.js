import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function FolderProvider({ children }) {
  const [folders, setFolders] = useState([])

  return (
    <AppContext.Provider value={{ folders, setFolders }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }