import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Board from 'components/template/bulletinboard'
import apiClient from 'libs/apiClient'
import { BoardRoomType } from 'types/internal/board'
import NoUser from 'components/widgets/NoUser'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await apiClient.get(`/board/boardRooms/${query.team}`).then((res) => {
    if (res.status !== 200) throw Error
    return res.data.boardRoom
  })
  return {
    props: { boardRoom: data },
  }
}

interface Props {
  boardRoom: BoardRoomType
}

export default function BoardPage(props: Props): JSX.Element {
  const { boardRoom } = props

  const router = useRouter()

  return (
    <>
      {router.query.team !== undefined ? (
        <Board boardRoom={boardRoom} />
      ) : (
        <NoUser contens='自分のTeamの掲示板' />
      )}
    </>
  )
}
