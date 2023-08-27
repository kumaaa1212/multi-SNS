import React, { useEffect, useState } from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Card/Bulletinboard'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import BasicPagination from '@/components/parts/Pagenation'

const Timeline = (props: any) => {
  const {
    boardRooms,
    setBoardRooms,
    sideMessagrBar,
    setSideMessagrBar,
    selectBoard,
    setSelectBoard,
  } = props

  const { team, userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const [input, setInput] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [fliteredBoardRooms, setFliteredBoardRooms] = useState<any[]>(boardRooms)

  useEffect(() => {
    const splitPage = (data: any[]) => {
      const start: number = currentPage * 6
      const end: number = start + 6
      setFliteredBoardRooms(data?.slice(start, end))
    }
    splitPage(boardRooms)
  }, [currentPage, boardRooms])

  const handleSend = async () => {
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
        {fliteredBoardRooms?.map((board: any) => (
          <BulletinboardCard
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
            pagelenght={boardRooms?.length}
          />
        </div>
      </div>
    </div>
  )
}

export default Timeline
