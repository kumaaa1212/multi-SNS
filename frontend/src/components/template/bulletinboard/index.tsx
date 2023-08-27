import { useState } from 'react'
import MessageSidebar from './sidebar'
import Timeline from './timeline'
import { BoardRoomType } from '@/types/global'
import style from './bulletinboard.module.scss'

interface Props {
  boardRooms: BoardRoomType[]
  setBoardRooms: React.Dispatch<React.SetStateAction<BoardRoomType[]>>
}

const Board = (props: Props) => {
  const { boardRooms, setBoardRooms } = props

  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)
  const [selectBoard, setSelectBoard] = useState<BoardRoomType | undefined>()

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
        {sideMessagrBar && (
          <MessageSidebar
            boardRooms={boardRooms}
            setBoardRooms={setBoardRooms}
            selectBoard={selectBoard}
          />
        )}
    </div>
  )
}

export default Board
