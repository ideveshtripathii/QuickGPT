import React, { use, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {user, loadingUser} = useAppContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  if(pathname === '/loading' || loadingUser) return <Loading />

  return (
    <>
    <Toaster />
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert z-10' onClick={()=>setIsMenuOpen(true)}/>}
    {isMenuOpen && <div onClick={()=>setIsMenuOpen(false)} className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity'></div>}

    {user ? (
      <div className='bg-slate-50 dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] text-gray-800 dark:text-white transition-colors duration-500'>
        <div className='flex h-[100dvh] w-screen overflow-hidden'>
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
          <Routes>
            <Route path='/' element={<ChatBox />} />
            <Route path='/credits' element={<Credits />} />
            <Route path='/community' element={<Community />} />
          </Routes>
        </div>
      </div>
    ) : (
      <div className='bg-slate-50 dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] flex items-center justify-center h-[100dvh] w-screen'>
        <Login />
      </div>
    )}
      
      
    </>
  )
}

export default App
