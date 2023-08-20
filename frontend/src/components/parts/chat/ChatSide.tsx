import { Dispatch, SetStateAction } from 'react'
import styles from './ChatContent.module.scss'
import Image from 'next/image'
import Icongenerate from '../../../utils/functions/Avater'
import { RoomType } from '@/types/global'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import noavater from '/public/noavater.jpg'

interface Props {
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  myRooms: RoomType[]
  room: RoomType
  setSelectRoom: Dispatch<SetStateAction<RoomType[]>>
}

const Chatlist = (props: Props) => {
  const { selectChatRoom, setSelectChatRoom, myRooms, room, setSelectRoom } = props
  const { userId } = useSelector((state: RootState) => state.user)

  const handleShowChatRoom = async (id: string) => {
    const selecredRoom: RoomType[] = myRooms?.filter((room: RoomType) => room.id === id)
    setSelectRoom(selecredRoom)
    setSelectChatRoom(!selectChatRoom)
  }

  const userIcon: string | null =
    userId === room.user1Id ? room.user2Icon : userId === room.user2Id ? room.user1Icon : null

  const userName: string | null =
    userId === room.user1Id ? room.user2Name : userId === room.user2Id ? room.user1Name : null

  return (
    <div className={styles.person_area} onClick={() => handleShowChatRoom(room.id)}>
      <div className={styles.pserson_detail}>
        <Image
          src={userIcon ? Icongenerate(userIcon) : noavater}
          alt={''}
          width={40}
          height={40}
          className={styles.person_icon}
        />
        <span>{userName}</span>
      </div>
      <div className={styles.pserson_subDetail}>
        <span className={styles.chat_time}>2023.11.3</span>
        <span className={styles.chat_content}>dvdvdvdvdvdvdvdvdvd</span>
      </div>
    </div>
  )
}

export default Chatlist
