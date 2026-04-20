import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({message}) => {

  useEffect(()=>{
    Prism.highlightAll()
  },[message.content])

  return (
    <div className='w-full'>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-6 gap-3 w-full pr-2'>
          <div className='flex flex-col gap-1 p-3 px-5 bg-gray-100 dark:bg-[#34244B] dark:text-gray-100 border border-gray-200 dark:border-[#57317C]/50 rounded-3xl rounded-tr-sm max-w-[85%] sm:max-w-[75%] shadow-sm'>
            <p className='text-[15px] whitespace-pre-wrap leading-relaxed'>{message.content}</p>
            <span className='text-[10px] text-gray-500 dark:text-[#A89CB8] self-end mt-1'>
              {moment(message.timestamp).fromNow()}</span>
          </div>
        </div>
      )
      : 
      (
        <div className='flex items-start gap-3 sm:gap-4 my-8 w-full group pl-1 sm:pl-2'>
          <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-[#A456F7] to-[#3D81F6] flex items-center justify-center shrink-0 shadow-md mt-1 p-1.5'>
              <img src={assets.logo} className='w-full h-full object-contain' style={{ filter: 'brightness(0) invert(1)' }} alt="AI" />
          </div>
          <div className='flex-1 flex flex-col min-w-0'>
            {message.isImage ? (
              <img src={message.content} alt="Generated Content" className='w-full max-w-lg mt-2 rounded-xl border border-gray-200 dark:border-[#80609F]/30 shadow-md'/>
            ):
            (
              <div className='text-[15px] dark:text-gray-200 text-gray-800 reset-tw leading-relaxed max-w-full overflow-hidden'>
               <Markdown>{message.content}</Markdown>
              </div>
            )}
            <span className='text-[10px] text-gray-400 dark:text-[#80609F] mt-2 opacity-50 hover:opacity-100 transition-opacity'>{moment(message.timestamp).fromNow()}</span>
          </div>
        </div>
      )
    }
    </div>
  )
}

export default Message
