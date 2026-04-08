import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import Header from '../header/header.jsx'
import Sidebar from '../sidebar/sidebar.jsx'

export default function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id='layout'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}


