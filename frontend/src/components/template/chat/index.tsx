import { useEffect, useState } from 'react'
import SideBar from './sidebar'
import ChatArea from './main/ChatArea'
import { Room } from '@/types/global'

interface Props {
  rooms: Room[]
}

const Chat = (props: Props) => {
  const { rooms } = props
  console.log(rooms)

  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(true)
  const [selectRoom, setSelectRoom] = useState<Room[]>([])

  return (
    <div className='chat'>
      <SideBar
        selectChatRoom={selectChatRoom}
        setSelectChatRoom={setSelectChatRoom}
        rooms={rooms}
        setSelectRoom={setSelectRoom}
      />
      <ChatArea selectRoom={selectRoom[0]} />
    </div>
  )
}

export default Chat
