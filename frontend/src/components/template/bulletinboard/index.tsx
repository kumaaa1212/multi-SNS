import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import Layout from 'components/layout'
import MessageSidebar from 'components/template/bulletinboard/_container/SideBar'
import Timeline from 'components/template/bulletinboard/_container/TimeLine'
import { BoardRoomType, BoardType } from 'types/global'
import Meta from 'components/layout/Head'
import ToastBase from 'components/parts/Toast'

interface Props {
  boardRoom: BoardRoomType
}

export default function Board(props: Props): JSX.Element {
  const { boardRoom } = props

  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [boardRooms, setBoardRooms] = useState<BoardRoomType>(boardRoom)
  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)
  const [selectBoard, setSelectBoard] = useState<BoardType | undefined>()

  return (
    <Layout>
      <Meta title='BulletinBoard' />
      <div className='display_flex'>
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
