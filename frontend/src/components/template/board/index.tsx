import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { HttpStatusCode } from 'axios'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import MessageSidebar from 'components/template/board/_container/SideBar'
import Timeline from 'components/template/board/_container/TimeLine'
import apiClient from 'libs/apiClient'
import { BoardRoomType, BoardType } from 'types/internal/board'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'
import style from './index.module.scss'

interface Props {
  boardRoom: BoardRoomType
}

export default function Board(props: Props): JSX.Element {
  const { boardRoom } = props

  const router = useRouter()
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [boardRooms, setBoardRooms] = useState<BoardRoomType>(boardRoom)
  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)
  const [selectBoard, setSelectBoard] = useState<BoardType | undefined>()

  useEffect(() => {
    const dataFetch = async (): Promise<void> => {
      await apiClient.get(`/board/boardRooms/${router.query.team}`).then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          toastFunc('掲示板の更新に失敗しました', true)
        }
        setBoardRooms(res.data.boardRoom)
      })
    }
    dataFetch()
  }, [router.query.team, toastFunc])

  return (
    <Layout>
      <Meta title='掲示板' />
      <div className={style.main} suppressHydrationWarning={true}>
        <Timeline
          boardRooms={boardRooms}
          setBoardRooms={setBoardRooms}
          sideMessagrBar={sideMessagrBar}
          setSideMessagrBar={setSideMessagrBar}
          selectBoard={selectBoard}
          setSelectBoard={setSelectBoard}
          toastFunc={toastFunc}
        />
        {sideMessagrBar && (
          <MessageSidebar selectBoard={selectBoard} setSelectBoard={setSelectBoard} />
        )}
      </div>
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </Layout>
  )
}
