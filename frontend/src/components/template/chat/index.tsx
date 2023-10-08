import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import ChatArea from 'components/template/chat/_container/main'
import { RoomType } from 'types/internal'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'
import SideBar from './_container/sidebar'
import style from './index.module.scss'

interface Props {
  rooms: RoomType[]
}

export default function Chat(props: Props): JSX.Element {
  const { rooms } = props

  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(false)
  const [selectRoom, setSelectRoom] = useState<RoomType>(rooms[0])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Layout bgColor='bg_blue' loadingAll={loading}>
      <Meta title='Chat' />
      <div className={style.chat}>
        <SideBar
          rooms={rooms}
          toastFunc={toastFunc}
          setLoading={setLoading}
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
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </Layout>
  )
}
