import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Room } from '@/types/global'
import styles from './ChatContent.module.scss'
import Icongenerate from '../Avater'
import noavater from '/public/noavater.jpg'
import Image from 'next/image'

interface Props {
  message: any
  selectRoom: Room
}

const ChatContent = (props: Props) => {
  const { message, selectRoom } = props
  const { userId } = useSelector((state: RootState) => state.user)
  console.log(selectRoom)
  console.log('AAA')
  console.log(message)
  console.log(selectRoom)

  const userIcon =
    message.authorId === selectRoom.user1Id
      ? selectRoom.user1Icon
      : message.authorId === selectRoom.user2Id
      ? selectRoom.user2Icon
      : null
  const userName =
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

export default ChatContent
