import React, { useState } from 'react'
import SideBar from './SideBar'
import ChatRoom from './ChatRoom'
import apiClient from '@/libs/apiClient'

const Chat = ({rooms}:any) => {
  const [chatRoom, setChatRoom] = useState(false)
  return (
    <div className='chat'>
      <SideBar chatRoom={chatRoom} setChatRoom={setChatRoom} rooms={rooms} />
      { chatRoom && (
        <ChatRoom />
      )}
    </div>
  )
}

export default Chat