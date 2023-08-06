import React from 'react'
import styles from './ChatContent.module.scss'
import Image from 'next/image'
import Icongenerate from '../Avater'
import apiClient from '@/libs/apiClient'
const ChatSide = (props: any) => {
  const { setChatRoom, room } = props
  console.log(room)

  const handleShowChatRoom = async (id: string) => {
    setChatRoom(true)
    try {
      await apiClient.post(`/rooms/${id}/messages`)
    } catch (e) {}
  }

  return (
    <div className={styles.person_area} onClick={() => handleShowChatRoom(room.id)}>
      <div className={styles.pserson_detail}>
        <Image
          src={Icongenerate(room.user2Icon)}
          alt={''}
          width={40}
          height={40}
          className={styles.person_icon}
        />
        <span>{room.user2Name}</span>
      </div>
      <div className={styles.pserson_subDetail}>
        <span className={styles.chat_time}>2023.11.3</span>
        <span className={styles.chat_content}>dvdvdvdvdvdvdvdvdvd</span>
      </div>
    </div>
  )
}

export default ChatSide
