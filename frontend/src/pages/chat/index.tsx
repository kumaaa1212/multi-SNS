import Chat from '@/components/template/chat'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { RoomType } from '@/types/global'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface Props {
  rooms: RoomType[]
}

const ChatPage = ({ rooms }: Props) => {
  const { userId, follow } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const roomFetch = async () => {
     const res = await apiClient.get(`/chat/allrooms/${userId}`)
     const rooms = res.data.rooms
    }
    roomFetch()
  },[])

  return <Chat rooms={rooms} />
}

export default ChatPage
