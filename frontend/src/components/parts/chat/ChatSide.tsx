import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from 'store/store'
import styles from './ChatContent.module.scss'
import noavater from '/public/noavater.jpg'
import { RoomType } from 'types/internal'
import Icongenerate from '../../../utils/functions/Avater'

interface Props {
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  myRooms: RoomType[]
  room: RoomType
  setSelectRoom: Dispatch<SetStateAction<RoomType>>
}

export default function Chatlist(props: Props): JSX.Element {
  const { selectChatRoom, setSelectChatRoom, room, setSelectRoom } = props
  const { userId } = useSelector((state: RootState) => state.user)

  const handleShowChatRoom = async (room: RoomType) => {
    setSelectRoom(room)
    setSelectChatRoom(!selectChatRoom)
  }

  const userIcon: string | null =
    userId === room.user1Id ? room.user2Icon : userId === room.user2Id ? room.user1Icon : null

  const userName: string | null =
    userId === room.user1Id ? room.user2Name : userId === room.user2Id ? room.user1Name : null

  return (
    <div className={styles.person_area} onClick={(): void => handleShowChatRoom(room)}>
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
      </div>
    </div>
  )
}
