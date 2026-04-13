import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './layout.css'
import Header from '../header/header.jsx'
import Sidebar from '../sidebar/sidebar.jsx'

export default function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id='layout'>
        <Sidebar />
        <div className='outlet-wrapper'>
          <Outlet />
        </div>
      </div>
    </>
  )
}


