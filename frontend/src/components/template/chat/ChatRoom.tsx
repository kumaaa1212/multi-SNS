import React from 'react'
import styles from './Chat.module.scss'
import Image from 'next/image'
import Img from '../../../../public/testImg1.jpg'
import ChatContent from '@/components/parts/Chat/ChatContent'
import { AuthInfo } from '@/context/auth'
const ChatRoom = () => {
  const auth = AuthInfo()
  return (
    <div className={styles.chatroom}>
      <ChatContent />
    </div>
  )
}

export default ChatRoom
