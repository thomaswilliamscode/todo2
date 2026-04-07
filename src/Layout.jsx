import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './Layout.css'

function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div id='layout'>
        <Sidebar />
        <Display />
      </div>
    </>
  )
}

export default Layout
