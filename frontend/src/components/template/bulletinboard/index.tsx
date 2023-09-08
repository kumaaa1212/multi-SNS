import { useState } from 'react'
import MessageSidebar from 'components/template/bulletinboard/sidebar'
import Timeline from 'components/template/bulletinboard/timeline'
import { BoardRoomType, BoardType } from 'types/global'
import style from './bulletinboard.module.scss'

interface Props {
  boardRoom: BoardRoomType
}

const Board = (props: Props): JSX.Element => {
  const { boardRoom } = props

  const [boardRooms, setBoardRooms] = useState<BoardRoomType>(boardRoom)
  const [selectBoard, setSelectBoard] = useState<BoardType | undefined>()
  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)

  return (
    <div className={style.board}>
      <Timeline
        boardRooms={boardRooms}
        setBoardRooms={setBoardRooms}
        sideMessagrBar={sideMessagrBar}
        setSideMessagrBar={setSideMessagrBar}
        selectBoard={selectBoard}
        setSelectBoard={setSelectBoard}
      />
      {/* {sideMessagrBar && (
        <MessageSidebar
          boardRooms={boardRooms}
          setBoardRooms={setBoardRooms}
          selectBoard={selectBoard}
        />
      )} */}
    </div>
  )
}

export default Board
