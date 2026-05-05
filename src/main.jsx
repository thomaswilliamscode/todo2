import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { FolderProvider } from "./context/folderProvider"
import FolderPage from './components/folderPage/folderPage'
import Inbox from './components/inbox/inbox'
import Focus from './components/focus/focus'
import Error from './components/error/error'
import Layout from './components/layout/layout'
import AddFolder from './components/addfolder/addfolder'
import AddList from './components/addlist/addlist'


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
        
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FolderProvider>
      <RouterProvider router={router} />
    </FolderProvider>
  </StrictMode>,
)