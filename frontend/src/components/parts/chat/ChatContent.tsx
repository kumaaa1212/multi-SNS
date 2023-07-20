import Image from 'next/image'
import React from 'react'
import Img from '../../../../public/profile_img.jpg'
import styles from './ChatContent.module.scss'

const ChatContent = () => {
  return (
    <div className={styles.chatContent}>
      <div className={styles.chat_person}>
        <Image src={Img} alt={''} width={40} height={40} className={styles.chatImg} />
        <span className={styles.chat_name}>Kuma</span>
      </div>
      <div className={styles.chatmessage}>
        <span>fvfsfvssfvsdvdsdvsvdsvdsvdmkmkmksmsckdvn,ikjuyhtgdrfedwefrgthfygjuyhftgdrfs</span>
      </div>
    </div>
  )
}

export default ChatContent
