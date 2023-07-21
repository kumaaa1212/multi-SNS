import Image from 'next/image'
import React from 'react'
import Img from '../../../../public/profile_img.jpg'
import styles from './ChatContent.module.scss'
import { AuthInfo } from '@/context/auth'

const ChatContent = () => {
  const auth = AuthInfo()
  return (
    <div className={styles.chatContent}>
      <div className={styles.chat_person}>
        <Image src={auth.icon} alt={''} width={40} height={40} className={styles.chatImg} />
        <span className={styles.chat_name}>{auth.username}</span>
      </div>
      <div className={styles.chatmessage}>
        <span>fvfsfvssfvsdvdsdvsvdsvdsvdmkmkmksmsckdvn,ikjuyhtgdrfedwefrgthfygjuyhftgdrfs</span>
      </div>
    </div>
  )
}

export default ChatContent
