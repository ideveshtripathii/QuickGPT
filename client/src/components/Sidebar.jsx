import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'
import toast from 'react-hot-toast'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {

    const {chats, setSelectedChat, theme, setTheme, user, navigate, createNewChat, axios, setChats, fetchUsersChats, setToken, token} = useAppContext()
    const [search, setSearch] = useState('')

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        toast.success('Logged out successfully')
    }

    const deleteChat = async (e, chatId) => {
        try {
            e.stopPropagation()
            const confirm = window.confirm('Are you sure you want to delete this chat?')
            if(!confirm) return
            const { data } = await axios.post('/api/chat/delete', {chatId}, { headers: { Authorization: token } })
            if(data.success){
                setChats(prev => prev.filter(chat => chat._id !== chatId))
                await fetchUsersChats()
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className={`flex flex-col h-[100dvh] w-72 shrink-0 p-5 bg-white/95 dark:bg-[#1A181C]/95 border-r border-gray-200 dark:border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:fixed max-md:top-0 left-0 z-50 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      {/* Logo */}
      <img onClick={()=>navigate('/')} src={theme === 'dark' ? assets.logo_full_dark : assets.logo_full} alt="PromptStack" className='w-full max-w-48 cursor-pointer'/>

      {/* New Chat Button */}
      <button onClick={createNewChat} className='group relative flex justify-center items-center w-full py-2.5 mt-6 font-medium text-white rounded-xl overflow-hidden shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#A456F7] to-[#3D81F6] opacity-90 group-hover:opacity-100 transition-opacity'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-white/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700'></div>
        <span className='relative flex items-center gap-2'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4'></path></svg>
            <span>New Chat</span>
        </span>
      </button>

      {/* Search Conversations */}
      <div className='relative mt-4 group'>
        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
            <img src={assets.search_icon} className='w-4 opacity-50 not-dark:invert group-focus-within:opacity-100 group-focus-within:target-purple-500 transition-opacity' alt="" />
        </div>
        <input 
            onChange={(e)=>setSearch(e.target.value)} 
            value={search} 
            type="text" 
            placeholder='Search conversations...' 
            className='w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#1A181C]/50 border border-gray-200 dark:border-[#80609F]/30 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400'
        />
      </div>

      {/* Recent Chats */}
      <div className='flex items-center justify-between mt-4 mb-2 px-1'>
         {chats.length > 0 && <p className='text-xs font-bold text-gray-400 dark:text-[#80609F] uppercase tracking-widest'>Recent Chats</p>}
      </div>
      
      <div className='flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar pb-4'>
        {
            chats.filter((chat)=> chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
                <div onClick={()=> {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false)}}
                 key={chat._id} 
                 className='relative p-3 px-4 dark:bg-[#57317C]/10 bg-white backdrop-blur-md border border-gray-200 dark:border-[#80609F]/20 rounded-xl cursor-pointer flex justify-between items-center group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-[#57317C]/30 hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-500/10 overflow-hidden'>
                    
                    {/* Active Indicator Glow */}
                    <div className='absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#A456F7] to-[#3D81F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    
                    <div className='flex items-center gap-3 w-full overflow-hidden ml-1'>
                        <div className='p-2 rounded-lg bg-gray-100 dark:bg-[#57317C]/40 text-gray-500 dark:text-[#A456F7] group-hover:text-[#3D81F6] transition-colors'>
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'></path></svg>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-700 dark:text-gray-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                                {chat.messages.length > 0 ? chat.messages[0].content : chat.name}
                            </p>
                            <p className='text-[10px] text-gray-400 dark:text-[#B1A6C0] mt-0.5'>{moment(chat.updatedAt).fromNow()}</p>
                        </div>
                    </div>
                    
                    <button 
                        className='p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-2'
                        onClick={e=> toast.promise(deleteChat(e, chat._id), {loading: 'deleting...' })}
                    >
                        <img src={assets.bin_icon} className='w-4 not-dark:invert opacity-70 hover:opacity-100 transition-opacity' alt="Delete" />
                    </button>
                </div>
            ))
        }
      </div>

      <div className='mt-2 space-y-0.5 pt-3 border-t border-gray-200 dark:border-[#80609F]/30'>
        {/* Community Images */}
        <div onClick={()=> {navigate('/community'); setIsMenuOpen(false)}} className='flex items-center gap-3 py-1.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/30 transition-all group font-medium text-gray-700 dark:text-gray-200'>
            <div className='p-1 rounded-md bg-gray-200/50 dark:bg-[#1A181C] group-hover:bg-white dark:group-hover:bg-[#57317C]/40 transition-colors shadow-sm'>
              <img src={assets.gallery_icon} className='w-4 h-4 not-dark:invert opacity-70 group-hover:opacity-100' alt="" />
            </div>
            <p className='text-sm'>Community Images</p>
        </div>

        {/* Credit Purchases Option */}
        <div onClick={()=> {navigate('/credits'); setIsMenuOpen(false)}} className='flex items-center justify-between py-1.5 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/30 transition-all group font-medium text-gray-700 dark:text-gray-200'>
            <div className='flex items-center gap-3'>
                <div className='p-1 rounded-md bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors shadow-sm'>
                  <img src={assets.diamond_icon} className='w-4 h-4 dark:invert opacity-80 group-hover:opacity-100' alt="" />
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm'>Credits</p>
                    <p className='text-[10px] text-gray-400'>Purchase more</p>
                </div>
            </div>
            <div className='px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-500/30'>
                {user?.credits || 0}
            </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className='flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#57317C]/30 transition-all group font-medium text-gray-700 dark:text-gray-200'>
            <div className='flex items-center gap-3'>
                <div className='p-1 rounded-md bg-gray-200/50 dark:bg-[#1A181C] group-hover:bg-white dark:group-hover:bg-[#57317C]/40 transition-colors shadow-sm'>
                    <img src={assets.theme_icon} className='w-4 h-4 not-dark:invert opacity-70 group-hover:opacity-100' alt="" />
                </div>
                <p className='text-sm'>Dark Mode</p>
            </div>
            <label className='relative inline-flex cursor-pointer items-center'>
                <input onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className="sr-only peer" checked={theme === 'dark'}/>
                <div className='w-8 h-4.5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-purple-500 transition-colors shadow-inner'></div>
                <span className='absolute left-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all peer-checked:translate-x-3.5 shadow-sm'></span>
            </label>
        </div>
      </div>

      {/* User Account */}
      <div className='mt-2 p-2 px-3 rounded-xl bg-gray-50 dark:bg-[#1A181C] border border-gray-200 dark:border-[#80609F]/20 flex items-center justify-between group hover:border-[#80609F]/60 transition-all cursor-pointer shadow-inner'>
          <div className='flex items-center gap-3 shrink-0 overflow-hidden'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-tr from-[#A456F7] to-[#3D81F6] p-[2px] shadow-sm shrink-0'>
                  <img src={assets.user_icon} className='w-full h-full rounded-full object-cover bg-white dark:bg-[#1A181C]' alt="" />
              </div>
              <p className='text-sm font-semibold text-gray-800 dark:text-gray-200 truncate pr-2'>
                  {user ? user.name : 'Sign In'}
              </p>
          </div>
          {user && (
              <button 
                onClick={logout} 
                className='p-1.5 rounded-lg text-gray-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100'
                title="Logout"
              >
                  <img src={assets.logout_icon} className='w-4 h-4 not-dark:invert opacity-70 hover:opacity-100' alt="Logout"/>
              </button>
          )}
      </div>

    <img onClick={()=> setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-6 right-5 w-6 h-6 cursor-pointer md:hidden not-dark:invert opacity-70 hover:opacity-100 transition-opacity' alt="" />

    </div>
  )
}

export default Sidebar
