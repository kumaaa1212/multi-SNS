import { useState } from 'react'
import style from '../Chat.module.scss'
import ChatContent from '@/components/parts/chat/ChatContent'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'
import { MessageType, RoomType } from '@/types/global'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  selectRoom: RoomType
  setSelectRoom: any
  selectChatRoom: boolean
}

const ChatArea = (props: Props) => {
  const { selectRoom, setSelectRoom, selectChatRoom } = props
  const [newMessage, setNewMessage] = useState<RoomType>()

  const { userId } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const handleSend = async () => {
    if (!input) return
    try {
      await apiClient.post('/chat/room/add/message', {
        roomId: selectRoom.id,
        content: input,
        authorId: userId,
        senderId: selectRoom.user2Id,
      })
      const deta = await apiClient.get(`/chat/room/chat/${selectRoom.id}`)
      setNewMessage(deta.data)
      setInput('')
    } catch {
      alert('メッセージの送信に失敗しました')
    }
  }

  return (
    <div className={style.chat_area}>
      {selectChatRoom && (
        <div>
          {newMessage ? (
            <div className={style.chat_area_scroll}>
              {newMessage?.messages.map((message: MessageType) => (
                <ChatContent message={message} selectRoom={selectRoom} />
              ))}
              <SendInput input={input} setInput={setInput} handleSend={handleSend} />
            </div>
          ) : (
            <div className={style.chat_area_scroll}>
              {selectRoom?.messages.map((message: MessageType) => (
                <ChatContent message={message} selectRoom={selectRoom} />
              ))}
              <SendInput input={input} setInput={setInput} handleSend={handleSend} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatArea
