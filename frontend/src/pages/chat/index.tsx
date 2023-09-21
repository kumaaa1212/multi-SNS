import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from 'components/template/chat'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import NoUser from 'components/widgets/NoUser'

interface Props {
  rooms: RoomType[]
}

export default function ChatPage({ rooms }: Props): JSX.Element {
  const [roomState, setRoomState] = useState<RoomType[]>([])
  const { userId } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const roomFetch = async (): Promise<void> => {
      await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setRoomState(res.data.rooms)
      })
    }
    roomFetch()
  }, [userId])

  return <>{userId.length > 0 ? <Chat rooms={roomState} /> : <NoUser contens='Chat' />}</>
}
