import Bulletinboard from '@/components/template/bulletinboard'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { BoardRoomType } from '@/types/global'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BulletinboardPage = () => {
  const { team } = useSelector((state: RootState) => state.user)
  const [boardRooms, setBoardRooms] = useState<BoardRoomType[]>([])

  useEffect(() => {
    const fetch = async () => {
      const res = await apiClient.get(`/post/boardRooms/${team}`)
      setBoardRooms(res.data.boardRooms[0].board)
    }
    fetch()
  }, [team])
  return <Bulletinboard boardRooms={boardRooms} setBoardRooms={setBoardRooms} />
}

export default BulletinboardPage
