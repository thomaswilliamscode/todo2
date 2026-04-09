import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FolderPage from './components/folderPage/folderPage'
import Add from './components/add-folder-or-list/add-folder-or-list'
import Inbox from './components/inbox/inbox'
import Focus from './components/focus/focus'
import Error from './components/error/error'
import Layout from './components/layout/layout'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Add />,
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
        
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
