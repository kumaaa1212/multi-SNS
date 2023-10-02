import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from 'components/template/chat'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import NoUser from 'components/widgets/NoUser'

export default function ChatPage(): JSX.Element {
  const [roomState, setRoomState] = useState<RoomType[]>([])
  const { userId } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userId.length === 0) return
    const roomFetch = async (): Promise<void> => {
      await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
        setRoomState(res.data.rooms)
      })
    }
    roomFetch()
  }, [userId])

  return (
    <div suppressHydrationWarning={false}>
      {userId.length > 0 ? <Chat rooms={roomState} /> : <NoUser contens='Chat' />}
    </div>
  )
}
