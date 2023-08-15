import React, { useState } from 'react'
import style from '../bulletinboard.module.scss'
import BulletinboardCard from '@/components/parts/Card/Bulletinboard'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

const Timeline = (props: any) => {
  const { sideMessagrBar, setSideMessagrBar, boardRooms, setBoardRooms, setSelectBoard } = props
  const { team, userId, username, iconPath } = useSelector((state: RootState) => state.user)

  const [input, setInput] = useState<string>('')
  // えぐいレンダリング起きている
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
        {boardRooms.map((board: any) => (
          <BulletinboardCard
            sideMessagrBar={sideMessagrBar}
            setSideMessagrBar={setSideMessagrBar}
            board={board}
            setSelectBoard={setSelectBoard}
          >
            {board.content}
          </BulletinboardCard>
        ))}
      </div>
      <div className={style.input_area}>
        <SendInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  )
}

export default Timeline
