import { useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { jLeagueTeams } from 'utils/TeamData'
import { BoardRoomType, BoardType } from 'types/global'
import BulletinboardCard from 'components/parts/Card/Board'
import SendInput from 'components/parts/Input/Send'
import BasicPagination from 'components/parts/Pagenation'
import style from './bulletinboard.module.scss'

interface Props {
  boardRooms: BoardRoomType
  setBoardRooms: React.Dispatch<React.SetStateAction<BoardRoomType>>
  sideMessagrBar: boolean
  setSideMessagrBar: React.Dispatch<React.SetStateAction<boolean>>
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
  toastFunc: (content: string, isError: boolean) => void
}

export default function Timeline(props: Props): JSX.Element {
  const { boardRooms, setBoardRooms, sideMessagrBar, setSideMessagrBar, toastFunc } = props
  const { selectBoard, setSelectBoard } = props

  const { team, userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)

  const handleSend = async (): Promise<void> => {
    const filterTeam = jLeagueTeams.filter((item) => item.name === team)
    if (input.length === 0) throw new Error('入力してください')
    await apiClient
      .post('/board/boards/add', {
        content: input,
        authorId: userId,
        authorName: username,
        authorAvatar: iconPath,
        team: filterTeam[0]?.label,
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          toastFunc('投稿に失敗しました', true)
          setInput('')
        } else {
          setBoardRooms(res.data.updatedRoom)
          setInput('')
        }
      })
  }

  return (
    <div className='full_width'>
      <div>
        {boardRooms.board?.slice(currentPage, currentPage + 6).map((board: BoardType) => (
          <BulletinboardCard
            key={board.id}
            sideMessagrBar={sideMessagrBar}
            setSideMessagrBar={setSideMessagrBar}
            board={board}
            selectBoard={selectBoard}
            setSelectBoard={setSelectBoard}
            setBoardRooms={setBoardRooms}
            toastFunc={toastFunc}
          >
            {board.content}
          </BulletinboardCard>
        ))}
      </div>
      <div className={style.handle_area}>
        <div className={style.input}>
          <SendInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            placeholder='メッセージを入力'
          />
        </div>
        <div className={style.pagenation}>
          <BasicPagination
            setCurrentPage={setCurrentPage}
            pagelenght={boardRooms?.board ? boardRooms.board.length : 0}
          />
        </div>
      </div>
    </div>
  )
}
