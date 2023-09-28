import { useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from 'store/store'
import { MessageType, RoomType } from 'types/internal'
import styles from './ChatContent.module.scss'
import Icongenerate from '../../../utils/functions/Avater'
import noavater from '/public/noavater.jpg'

interface Props {
  message: MessageType
  selectRoom: RoomType
}

export default function ChatContent(props: Props): JSX.Element {
  const { message, selectRoom } = props

  const { userId } = useSelector((state: RootState) => state.user)

  const userIcon: string | null =
    message.authorId === selectRoom.user1Id
      ? selectRoom.user1Icon
      : message.authorId === selectRoom.user2Id
      ? selectRoom.user2Icon
      : null
  const userName: string | null =
    message.authorId === selectRoom.user1Id
      ? selectRoom.user1Name
      : message.authorId === selectRoom.user2Id
      ? selectRoom.user2Name
      : null

  return (
    <div
      className={
        userId === message.authorId ? styles.chatContent_mychat : styles.chatContent_senderchat
      }
    >
      <div>
        <div className={styles.chat_person}>
          <Image
            src={userIcon ? Icongenerate(userIcon) : noavater}
            alt={''}
            width={40}
            height={40}
            className={styles.chatImg}
          />
          <span className={styles.chat_name}>{userName}</span>
        </div>
        <div className={styles.chatmessage}>
          <span>{message.content}</span>
        </div>
      </div>
    </div>
  )
}
