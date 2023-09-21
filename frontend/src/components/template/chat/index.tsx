import { useState } from 'react'
import Layout from 'components/layout'
import { RoomType } from 'types/internal'
import Meta from 'components/layout/Head'
import style from './Chat.module.scss'
import ChatArea from './_container/main/ChatArea'
import SideBar from './_container/sidebar'

interface Props {
  rooms: RoomType[]
}

const Chat = (props: Props): JSX.Element => {
  const { rooms } = props

  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(true)
  const [selectRoom, setSelectRoom] = useState<RoomType[]>([])

  return (
    <Layout>
      <Meta title='Chat' />
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
    </Layout>
  )
}

export default Chat
