import { GetServerSideProps } from 'next'
import Board from 'components/template/bulletinboard'
import apiClient from 'libs/apiClient'
import { BoardRoomType } from 'types/global'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { team } = context.query
  const res = await apiClient.get(`/post/boardRooms/${team}`)
  return {
    props: {
      boardRoom: res.data.boardRoom,
    },
  }
}

interface Props {
  boardRoom: BoardRoomType
}

const BoardPage = (props: Props): JSX.Element => {
  const { boardRoom } = props

  return <Board boardRoom={boardRoom} />
}

export default BoardPage
