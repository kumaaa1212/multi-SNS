import { useState } from 'react'
import { useToast } from 'components/hooks/useToast'
import MessageSidebar from 'components/template/bulletinboard/sidebar'
import Timeline from 'components/template/bulletinboard/timeline'
import { BoardRoomType, BoardType } from 'types/global'
import ToastBase from 'components/parts/Toast'
import style from './bulletinboard.module.scss'

interface Props {
  boardRoom: BoardRoomType
}

const Board = (props: Props): JSX.Element => {
  const { boardRoom } = props

  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [boardRooms, setBoardRooms] = useState<BoardRoomType>(boardRoom)
  const [selectBoard, setSelectBoard] = useState<BoardType | undefined>()
  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)

  return (
    <div>
      <div className={style.board}>
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
    </div>
  )
}

export default Board
