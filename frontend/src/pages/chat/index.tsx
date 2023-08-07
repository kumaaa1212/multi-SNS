import Chat from '@/components/template/chat'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { RoomType } from '@/types/global'
import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'

interface Props {
  rooms:RoomType[]
}

const ChatPage = ({rooms}:Props) => {
  console.log(rooms)
  const { userId } = useSelector((state: RootState) => state.user)

  const filterRooms = rooms?.filter((room: any) => room.user1Id || room.user2Id === userId)

  return <Chat rooms={filterRooms} />
}

export default ChatPage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await apiClient.get('/chat/room/allrooms')
    const rooms = res.data.rooms
    console.log(rooms)
    return {
      props: {
        rooms: rooms
      },
    }
  } catch (error) {
    console.error('Error while fetching data:', error)
    return {
      props: {
        rooms: [],
      },
    }
  }
}
