import Bulletinboard from '@/components/template/bulletinboard'
import apiClient from '@/libs/apiClient'
import { GetServerSideProps } from 'next'

const BulletinboardPage = () => {
  return <Bulletinboard />
}

export default BulletinboardPage

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
