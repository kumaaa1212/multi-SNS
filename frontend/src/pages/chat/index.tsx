import Chat from '@/components/template/chat'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { RoomType } from '@/types/global'
import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'

interface Props {
  rooms: RoomType[]
}

const ChatPage = ({ rooms }: Props) => {
  const { userId, follow } = useSelector((state: RootState) => state.user)

  const filterMyRooms = rooms?.filter((room: any) =>
    follow.some(
      (person) =>
        (person.authorId === room.user1Id && room.user2Id === userId) ||
        (person.authorId === room.user2Id && room.user1Id === userId),
    ),
  )

  return <Chat filterMyRooms={filterMyRooms} />
}

export default ChatPage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await apiClient.get('/chat/allrooms/')
    const rooms = res.data.rooms
    return {
      props: {
        rooms: rooms,
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
