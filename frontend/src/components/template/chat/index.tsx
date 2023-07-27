import { useState } from 'react'
import SideBar from './room/SideBar'
import ChatArea from './chatArea/ChatArea'

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