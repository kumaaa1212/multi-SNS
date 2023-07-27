import React from 'react'
import style from '../Chat.module.scss'
import Image from 'next/image'
import Img from '../../../../public/testImg1.jpg'
import ChatContent from '@/components/parts/Chat/ChatContent'
import { AuthInfo } from '@/context/auth'
const ChatArea = () => {
  const auth = AuthInfo()
  return (
    <div className={style.chat_area}>
      <ChatContent />
    </div>
  )
}

export default ChatArea
