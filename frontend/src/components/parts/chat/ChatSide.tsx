import { AuthInfo } from '@/context/auth'
import React from 'react'
import styles from './ChatContent.module.scss'
import Image from 'next/image'
const ChatSide = (props :any) => {
  const { setChatRoom } = props
  const auth = AuthInfo()
  return (
    <div className={styles.person_area} onClick={() =>setChatRoom(true) }>
      <div className={styles.pserson_detail}>
        <Image src={auth.icon} alt={''} width={40} height={40} className={styles.person_icon} />
        <span>{auth.username}</span>
      </div>
      <div className={styles.pserson_subDetail}>
        <span className={styles.chat_time}>2023.11.3</span>
        <span className={styles.chat_content}>dvdvdvdvdvdvdvdvdvd</span>
      </div>
    </div>
  )
}

export default ChatSide
