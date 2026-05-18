import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './layout.css'
import Header from '../header/header.jsx'
import SidebarLayout from '../../sidebar/sidebarLayout/sidebarLayout.jsx'

export default function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id='layout'>
        <SidebarLayout />
        <div className='outlet-wrapper'>
          <Outlet />
        </div>
      </div>
    </>
  )
}


