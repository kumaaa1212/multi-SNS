import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { MessageType, RoomType } from 'types/internal'
import SendInput from 'components/parts/Input/Send'
import ChatContent from 'components/parts/chat/ChatContent'
import style from './Main.module.scss'

interface Props {
  selectRoom: RoomType
  setSelectRoom: React.Dispatch<React.SetStateAction<RoomType[]>>
  selectChatRoom: boolean
}

const ChatArea = (props: Props): JSX.Element => {
  const { selectRoom, setSelectRoom, selectChatRoom } = props
  const [newMessage, setNewMessage] = useState<RoomType>()

  const { userId } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const router = useRouter()

  const handleSend = async (): Promise<void> => {
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
    <div>
      {selectChatRoom && (
        <div>
          {newMessage ? (
            <div className={style.chat_area_scroll}>
              {newMessage?.messages.map((message: MessageType) => (
                <ChatContent message={message} selectRoom={selectRoom} key={message.id} />
              ))}
              <div className={style.input_area}>
                <SendInput input={input} setInput={setInput} handleSend={handleSend} />
              </div>
            </div>
          ) : (
            <div className={style.chat_area_scroll}>
              {selectRoom?.messages.map((message: MessageType) => (
                <ChatContent message={message} selectRoom={selectRoom} key={message.id} />
              ))}
              <div className={style.input_area}>
                <SendInput input={input} setInput={setInput} handleSend={handleSend} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatArea
