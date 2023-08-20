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
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const splitPage = (data: any[]) => {
      const start: number = currentPage * 6
      const end: number = start + 6
      console.log(start, end)
      console.log(data?.slice(start, end))
      setBoardRooms(data?.slice(start, end))
    }
    splitPage(boardRooms)
  }, [currentPage])

  console.log(boardRooms)

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
        {boardRooms?.slice(0, 6).map((board: any) => (
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
