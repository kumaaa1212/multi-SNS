import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import ChatArea from 'components/template/chat/_container/main'
import { RoomType } from 'types/internal'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'
import SwipeableEdgeDrawer from 'components/widgets/Drawer'
import SideBar from './_container/sidebar'
import style from './index.module.scss'

interface Props {
  rooms: RoomType[]
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Chat(props: Props): JSX.Element {
  const { rooms, loading, setLoading } = props

  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [roomState, setRoomState] = useState<RoomType[]>(rooms)
  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(false)
  const [selectRoom, setSelectRoom] = useState<RoomType>(rooms[0])

  return (
    <Layout bgColor='bg_blue' loadingAll={loading} footerState>
      <Meta title='Chat' />
      <div className={style.chat_drawer}>
        <SwipeableEdgeDrawer>
          <SideBar
            toastFunc={toastFunc}
            setLoading={setLoading}
            rooms={rooms}
            roomState={roomState}
            setRoomState={setRoomState}
            selectChatRoom={selectChatRoom}
            setSelectChatRoom={setSelectChatRoom}
            setSelectRoom={setSelectRoom}
          />
        </SwipeableEdgeDrawer>
      </div>
      <div className={style.chat}>
        <div className={style.chat_side}>
          <SideBar
            toastFunc={toastFunc}
            setLoading={setLoading}
            rooms={rooms}
            roomState={roomState}
            setRoomState={setRoomState}
            selectChatRoom={selectChatRoom}
            setSelectChatRoom={setSelectChatRoom}
            setSelectRoom={setSelectRoom}
          />
        </div>
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
