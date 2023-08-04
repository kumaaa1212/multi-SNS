import { useState } from 'react'
import SideBar from './sidebar'
import ChatArea from './main/ChatArea'

const Chat = ({rooms}:any) => {
  const [chatRoom, setChatRoom] = useState(false)
  return (
    <div className='chat'>
      <SideBar chatRoom={chatRoom} setChatRoom={setChatRoom} rooms={rooms} />
      { chatRoom && (
        <ChatArea />
      )}
    </div>
  )
}

export default Chat