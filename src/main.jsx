import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FolderPage from './pages/folderPage/folderPage'
import ListPage from './pages/listPage/listPage'
import Inbox from './sidebar/inbox/inbox'
import FocusPage from './pages/focusPage/focusPage'
import Error from './components/error/error'
import Layout from './components/layout/layout'
import AddPage from './pages/addPage/addPage'
import { FolderProvider } from './context/folderContext' 
import { ListProvider } from './context/listContext' 
import { TodosProvider } from './context/todosContext' 
import { InboxProvider } from './context/inboxContext' 





const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/inbox',
        element: <Inbox />,
      },
      {
        path: '/focus',
        element: <FocusPage />,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/folder/:folderId',
        element: <FolderPage />,
      },
      {
        path: '/list/:listId',
        element: <ListPage />,
      },
        
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FolderProvider>
      <ListProvider>
        <TodosProvider>
          <InboxProvider>
            <RouterProvider router={router}/>
          </InboxProvider>
        </TodosProvider>
      </ListProvider> 
    </FolderProvider>
  </StrictMode>,
)
