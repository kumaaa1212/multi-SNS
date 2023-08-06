import Chat from '@/components/template/chat'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { GetServerSideProps } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'

const ChatPage = ({ rooms }: any) => {
  console.log(rooms)
  const { userId } = useSelector((state: RootState) => state.user)
  const filterRooms = rooms.rooms.filter((room: any) => room.user1Id === userId)

  return <Chat rooms={filterRooms} />
}

export default ChatPage

export const getServerSideProps: GetServerSideProps = async () => {

  try {
    const res = await apiClient.get('/chat/room/allroom')
    const rooms = res.data
    return {
      props: {
        rooms
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
