import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FolderPage from './pages/folderPage/folderPage'
import ListPage from './pages/listPage/listPage'
import Inbox from './components/inbox/inbox'
import Focus from './components/focus/focus'
import Error from './components/error/error'
import Layout from './components/layout/layout'
import AddFolder from './components/addfolder/addfolder'
import AddList from './components/addlist/addlist'
import { FolderProvider } from './context/folderContext' 
import { ListProvider } from './context/listContext' 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/addfolder',
        element: <AddFolder />,
      },
      {
        path: '/addlist',
        element: <AddList />,
      },
      {
        path: '/inbox',
        element: <Inbox />,
      },
      {
        path: '/focus',
        element: <Focus />,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/folder/:id',
        element: <FolderPage />,
      },
      {
        path: '/list/:id',
        element: <ListPage />,
      },
        
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FolderProvider>
      <ListProvider>
      <RouterProvider router={router}/>
      </ListProvider> 
    </FolderProvider>
  </StrictMode>,
)
