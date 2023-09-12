import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Board from 'components/template/bulletinboard'
import apiClient from 'libs/apiClient'
import { BoardRoomType } from 'types/global'
import NoUser from 'components/widgets/NoUser'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { team } = context.query
  try {
    const res = await apiClient.get(`/board/boardRooms/${team}`)
    return {
      props: {
        boardRoom: res.data.boardRoom,
      },
    }
  } catch (err) {
    return {
      props: {
        boardRoom: [],
      },
    }
  }
}

interface Props {
  boardRoom: BoardRoomType
}

const BoardPage = (props: Props): JSX.Element => {
  const { boardRoom } = props
  const router = useRouter()

  return <div>{router.query.team === undefined ? <Board boardRoom={boardRoom} /> : <NoUser />}</div>
}

export default BoardPage
