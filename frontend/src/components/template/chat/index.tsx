import { useState } from 'react'
import SideBar from './sidebar'
import ChatArea from './main/ChatArea'
import { RoomType } from '@/types/global'
import style from './Chat.module.scss'

interface Props {
  rooms: RoomType[]
}

const Chat = (props: Props) => {
  const { rooms } = props


  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(true)
  const [selectRoom, setSelectRoom] = useState<RoomType[]>([])

  return (
    <div className={style.chat}>
      <SideBar
      rooms={rooms}
        selectChatRoom={selectChatRoom}
        setSelectChatRoom={setSelectChatRoom}
        setSelectRoom={setSelectRoom}
      />
      <ChatArea
        selectRoom={selectRoom[0]}
        setSelectRoom={setSelectRoom}
        selectChatRoom={selectChatRoom}
      />
    </div>
  )
}

export default Chat
