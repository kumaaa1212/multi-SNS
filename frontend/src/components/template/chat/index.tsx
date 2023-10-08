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
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Chat(props: Props): JSX.Element {
  const { rooms, loading, setLoading } = props

  const [roomState, setRoomState] = useState<RoomType[]>(rooms)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(false)
  const [selectRoom, setSelectRoom] = useState<RoomType>(rooms[0])

  return (
    <Layout bgColor='bg_blue' loadingAll={loading}>
      <Meta title='Chat' />
      <div className={style.chat}>
        <SideBar
          roomState={roomState}
          setRoomState={setRoomState}
          toastFunc={toastFunc}
          setLoading={setLoading}
          selectChatRoom={selectChatRoom}
          setSelectChatRoom={setSelectChatRoom}
          setSelectRoom={setSelectRoom}
        />
        <ChatArea
          setRoomState={setRoomState}
          setLoading={setLoading}
          toastFunc={toastFunc}
          selectRoom={selectRoom}
          setSelectRoom={setSelectRoom}
          selectChatRoom={selectChatRoom}
          setSelectChatRoom={setSelectChatRoom}
        />
      </div>
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </Layout>
  )
}
