import React from 'react'
import style from '../Chat.module.scss'
import Image from 'next/image'
import Img from '../../../../public/testImg1.jpg'
import { AuthInfo } from '@/context/auth'
import ChatContent from '@/components/parts/chat/ChatContent'
const ChatArea = () => {
  const auth = AuthInfo()
  return (
    <div className={style.chat_area}>
      <ChatContent />
    </div>
  )
}

export default ChatArea
