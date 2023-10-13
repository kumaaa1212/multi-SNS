import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from 'components/template/chat'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import NoUser from 'components/widgets/NoUser'

export default function ChatPage(): JSX.Element {
  const [roomState, setRoomState] = useState<RoomType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { userId } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    const roomFetch = async (): Promise<void> => {
      try {
        await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
          setRoomState(res.data.rooms)
          setLoading(false)
        })
      } catch {
        setLoading(false)
      }
    }
    roomFetch()
  }, [userId])

  return (
    <div>
      {userId ? (
        <Chat rooms={roomState} loading={loading} setLoading={setLoading} />
      ) : (
        <NoUser contens='Chat' />
      )}
    </div>
  )
}
