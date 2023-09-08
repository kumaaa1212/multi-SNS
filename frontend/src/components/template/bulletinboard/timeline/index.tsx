import { useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { BoardRoomType, BoardType } from 'types/global'
import BulletinboardCard from 'components/parts/Card/Bulletinboard'
import SendInput from 'components/parts/Input'
import BasicPagination from 'components/parts/Pagenation'
import style from '../bulletinboard.module.scss'

interface Props {
  boardRooms: BoardRoomType
  setBoardRooms: React.Dispatch<React.SetStateAction<BoardRoomType>>
  sideMessagrBar: boolean
  setSideMessagrBar: React.Dispatch<React.SetStateAction<boolean>>
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
}

const Timeline = (props: Props): JSX.Element => {
  const { boardRooms, setBoardRooms, sideMessagrBar, setSideMessagrBar } = props

  const { selectBoard, setSelectBoard } = props
  const { team, userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleSend = async (): Promise<void> => {
    try {
      if (input.length === 0) throw new Error('入力してください')
      const newRoom = await apiClient.post('/post/boards', {
        content: input,
        authorId: userId,
        authorName: username,
        authorAvatar: iconPath,
        team: team,
      })
      setBoardRooms(newRoom.data.updatedRoom.board)
      setInput('')
    } catch {
      alert('投稿に失敗しました')
      setInput('')
    }
  }

  return (
    <div className={style.timeline}>
      <div className={style.timeline_main}>
        {boardRooms.board?.slice(currentPage, currentPage + 6).map((board: BoardType) => (
          <BulletinboardCard
            key={board.id}
            sideMessagrBar={sideMessagrBar}
            setSideMessagrBar={setSideMessagrBar}
            board={board}
            selectBoard={selectBoard}
            setSelectBoard={setSelectBoard}
          >
            {board.content}
          </BulletinboardCard>
        ))}
      </div>
      <div className={style.input_area}>
        <div className={style.input}>
          <SendInput input={input} setInput={setInput} handleSend={handleSend} />
        </div>
        <div className={style.pagenation}>
          <BasicPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagelenght={boardRooms?.board.length}
          />
        </div>
      </div>
    </div>
  )
}

export default Timeline
