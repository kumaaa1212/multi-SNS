import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Chat from 'components/template/chat'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/global'
import NoUser from 'components/widgets/NoUser'

interface Props {
  rooms: RoomType[]
}

const ChatPage = ({ rooms }: Props): JSX.Element => {
  const { userId } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const roomFetch = async (): Promise<void> => {
      const res = await apiClient.get(`/chat/allrooms/${userId}`)
      const rooms = res.data.rooms
    }
    roomFetch()
  }, [userId])

  return <>{userId.length > 0 ? <Chat rooms={rooms} /> : <NoUser contens='Chat' />}</>
}

export default ChatPage
