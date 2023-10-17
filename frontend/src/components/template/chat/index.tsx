import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import ChatArea from 'components/template/chat/_container/main'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'
import SwipeableEdgeDrawer from 'components/widgets/Drawer'
import SideBar from './_container/sidebar'
import style from './index.module.scss'

export default function Chat(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [roomState, setRoomState] = useState<RoomType[]>([])
  const [rooms, setRooms] = useState<RoomType[]>(roomState || [])
  const [selectChatRoom, setSelectChatRoom] = useState<boolean>(false)
  const [selectRoom, setSelectRoom] = useState<RoomType | undefined>()

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    const roomFetch = async (): Promise<void> => {
      try {
        await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
          setRoomState(res.data.rooms)
          setRooms(res.data.rooms)
          setLoading(false)
        })
      } catch {
        setLoading(false)
      }
    }
    roomFetch()
  }, [setLoading, userId, selectRoom])

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
