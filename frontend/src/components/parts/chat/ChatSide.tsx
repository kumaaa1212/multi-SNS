import { Dispatch, SetStateAction } from 'react'
import styles from './ChatContent.module.scss'
import Image from 'next/image'
import Icongenerate from '../Avater'
import { Room } from '@/types/global'

interface Props {
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  rooms: Room[]
  room: Room
  setSelectRoom: Dispatch<SetStateAction<Room[]>>
}

const ChatSide = (props: Props) => {
  const { selectChatRoom, setSelectChatRoom, rooms, room, setSelectRoom } = props

  const handleShowChatRoom = async (id: string) => {
    const selecredRoom = rooms?.filter((room: any) => room.id === id)
    setSelectRoom(selecredRoom)
    setSelectChatRoom(!selectChatRoom)
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
