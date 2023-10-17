import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from 'store/store'
import { formatTimestamp } from 'utils/functions/Time'
import style from './ChatList.module.scss'
import noavater from '/public/noavater.jpg'
import { RoomType } from 'types/internal'
import Icongenerate from '../../../../../../utils/functions/Avater'

interface Props {
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  room: RoomType
  setSelectRoom: Dispatch<SetStateAction<RoomType | undefined>>
}

export default function Chatlist(props: Props): JSX.Element {
  const { selectChatRoom, setSelectChatRoom, room, setSelectRoom } = props
  const { userId } = useSelector((state: RootState) => state.user)

  const handleShowChatRoom = async (room: RoomType): Promise<void> => {
    if (!selectChatRoom) {
      setSelectChatRoom(true)
      setSelectRoom(room)
    } else {
      setSelectChatRoom(false)
    }
  }

  const userIcon: string | null =
    userId === room.user1Id ? room.user2Icon : userId === room.user2Id ? room.user1Icon : null

  const userName: string | null =
    userId === room.user1Id ? room.user2Name : userId === room.user2Id ? room.user1Name : null

  return (
    <div className={style.person_area} onClick={(): Promise<void> => handleShowChatRoom(room)}>
      <div className={style.pserson_detail}>
        <Image
          src={userIcon ? Icongenerate(userIcon) : noavater}
          alt={'プロフィール画像'}
          width={40}
          height={40}
          className={style.person_icon}
        />
        <span>{userName}</span>
      </div>
      <div className={style.pserson_subDetail}>
        <span className={style.chat_time}>{formatTimestamp(room.createdAt)}</span>
      </div>
    </div>
  )
}
