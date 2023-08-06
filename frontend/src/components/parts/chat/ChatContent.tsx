import Image from 'next/image'
import React from 'react'
import Img from '../../../../public/profile_img.jpg'
import styles from './ChatContent.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const ChatContent = () => {
  const { icon, username } = useSelector((state: RootState) => state.user)

  return (
    <div className={styles.chatContent}>
      <div className={styles.chat_person}>
        <Image src={`/${icon}`} alt={''} width={40} height={40} className={styles.chatImg} />
        <span className={styles.chat_name}>{username}</span>
      </div>
      <div className={styles.chatmessage}>
        <span>fvfsfvssfvsdvdsdvsvdsvdsvdmkmkmksmsckdvn,ikjuyhtgdrfedwefrgthfygjuyhftgdrfs</span>
      </div>
    </div>
  )
}

export default ChatContent
