import { useState } from 'react'
import SideBar from './sidebar'
import ChatArea from './main/ChatArea'
import { RoomType } from '@/types/global'

interface Props {
  rooms: RoomType[]
}

const Chat = (props: Props) => {
  const { rooms } = props

  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(true)
  const [selectRoom, setSelectRoom] = useState<RoomType[]>(rooms)

  return (
    <div className='chat'>
      <SideBar
        selectChatRoom={selectChatRoom}
        setSelectChatRoom={setSelectChatRoom}
        rooms={rooms}
        setSelectRoom={setSelectRoom}
      />
      <ChatArea selectRoom={selectRoom[0]} setSelectRoom={setSelectRoom} selectChatRoom={selectChatRoom} />
    </div>
  )
}

export default Chat
