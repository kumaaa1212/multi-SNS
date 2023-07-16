import React from 'react'
import SideBar from './SideBar'
import ChatRoom from './ChatRoom'

const Chat = () => {
  return (
    <div className='chat'>
      <SideBar/>
      <ChatRoom/>
    </div>
  )
}

export default Chat