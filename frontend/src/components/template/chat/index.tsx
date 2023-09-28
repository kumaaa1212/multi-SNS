import { useState } from 'react'
import Layout from 'components/layout'
import { RoomType } from 'types/internal'
import Meta from 'components/layout/Head'
import style from './Chat.module.scss'
import ChatArea from './_container/main'
import SideBar from './_container/sidebar'

interface Props {
  rooms: RoomType[]
}

export default function Chat(props: Props): JSX.Element {
  const { rooms } = props

  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(false)
  const [selectRoom, setSelectRoom] = useState<RoomType>(rooms[0])

  return (
    <Layout bgColor='bg_blue'>
      <Meta title='Chat' />
      <div className={style.chat}>
        <SideBar
          rooms={rooms}
          selectChatRoom={selectChatRoom}
          setSelectChatRoom={setSelectChatRoom}
          setSelectRoom={setSelectRoom}
        />
        <ChatArea
          selectRoom={selectRoom}
          setSelectRoom={setSelectRoom}
          selectChatRoom={selectChatRoom}
        />
      </div>
    </Layout>
  )
}
