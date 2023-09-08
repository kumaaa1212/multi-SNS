import Board from '@/components/template/bulletinboard'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { BoardRoomType } from '@/types/global'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { team } = context.query
  const data = await apiClient.get(`/post/boardRooms/${team}`)
  return {
    props: {
      data: data.data,
    },
  }
}

const BoardPage = ({ data }: any) => {
  const [boardRooms, setBoardRooms] = useState<BoardRoomType[]>(data.boardRooms)

  return <Board boardRooms={boardRooms} setBoardRooms={setBoardRooms} />
}

export default BoardPage
