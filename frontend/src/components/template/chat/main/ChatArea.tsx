import { useState } from 'react'
import style from '../Chat.module.scss'
import ChatContent from '@/components/parts/chat/ChatContent'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'
import {  MessageType, RoomType,  } from '@/types/global'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  selectRoom: RoomType
}

const ChatArea = (props: Props) => {
  const { selectRoom } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const handleSend = async () => {
    await apiClient.post('/chat/room/add/message', {
      roomId: selectRoom.id,
      content: input,
      authorId: userId,
      senderId: selectRoom.user2Id,
    })
    router.reload()
  }

  return (
    <div className={style.chat_area}>
      <div className={style.chat_area_scroll}>
        {selectRoom?.messages.map((message: MessageType) => (
          <ChatContent message={message} selectRoom={selectRoom} />
        ))}
        <SendInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  )
}

export default ChatArea
