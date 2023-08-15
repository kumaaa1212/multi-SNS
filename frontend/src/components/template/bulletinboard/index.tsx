import { useState } from 'react'
import MessageSidebar from './sidebar'
import Timeline from './timeline'
import { BoardRoomType } from '@/types/global'
import style from './bulletinboard.module.scss'

interface Props {
  boardRooms: BoardRoomType[]
  setBoardRooms: React.Dispatch<React.SetStateAction<BoardRoomType[]>>
}

const Bulletinboard = (props: Props) => {
  const { boardRooms, setBoardRooms } = props

  const [sideMessagrBar, setSideMessagrBar] = useState<boolean>(false)
  const [selectBoard, setSelectBoard] = useState<any>([])
  return (
    <div className={style.bulletinboard}>
      <Timeline
        sideMessagrBar={sideMessagrBar}
        setSideMessagrBar={setSideMessagrBar}
        boardRooms={boardRooms}
        setBoardRooms={setBoardRooms}
        setSelectBoard={setSelectBoard}
      />
      <div>{sideMessagrBar ? <MessageSidebar selectBoard={selectBoard} /> : null}</div>
    </div>
  )
}

export default Bulletinboard
