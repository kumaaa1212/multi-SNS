import { useState } from 'react'
import SideBar from './sidebar'
import ChatArea from './main/ChatArea'
import { RoomType } from '@/types/global'

interface Props {
  filterMyRooms: RoomType[]
}

const Chat = (props: Props) => {
  const { filterMyRooms } = props

  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(true)
  const [selectRoom, setSelectRoom] = useState<RoomType[]>([])

  return (
    <div className='chat'>
      <SideBar
        selectChatRoom={selectChatRoom}
        setSelectChatRoom={setSelectChatRoom}
        filterMyRooms={filterMyRooms}
        setSelectRoom={setSelectRoom}
      />
      <ChatArea selectRoom={selectRoom[0]} setSelectRoom={setSelectRoom} selectChatRoom={selectChatRoom} />
    </div>
  )
}

export default Chat
