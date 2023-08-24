import Board from '@/components/template/bulletinboard'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { BoardRoomType } from '@/types/global'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BoardPage = () => {
  const { team, userId } = useSelector((state: RootState) => state.user)
  const [boardRooms, setBoardRooms] = useState<BoardRoomType[]>([])

  useEffect(() => {
    if (userId) {
      const fetch = async () => {
        const res = await apiClient.get(`/post/boardRooms/${team}`)
        setBoardRooms(res.data.boardRooms[0]?.board)
      }
      fetch()
    } else {
      setBoardRooms([])
    }
  }, [])

  return <Board boardRooms={boardRooms} setBoardRooms={setBoardRooms} />
}

export default BoardPage
