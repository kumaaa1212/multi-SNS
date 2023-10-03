import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Board from 'components/template/board'
import apiClient from 'libs/apiClient'
import { BoardRoomType } from 'types/internal/board'
import NoUser from 'components/widgets/NoUser'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await apiClient.get(`/board/boardRooms/${query.team}`)
    const data = res.data.boardRoom
    return {
      props: { boardRoom: data },
    }
  } catch {
    return {
      props: { boardRoom: [] },
    }
  }
}

interface Props {
  boardRoom: BoardRoomType
}

export default function BoardPage(props: Props): JSX.Element {
  const { boardRoom } = props

  const router = useRouter()

  return (
    <div suppressHydrationWarning={false}>
      {router.query.team === String(undefined) ? (
        <NoUser contens='自分のTeamの掲示板' />
      ) : (
        <Board boardRoom={boardRoom} />
      )}
    </div>
  )
}
