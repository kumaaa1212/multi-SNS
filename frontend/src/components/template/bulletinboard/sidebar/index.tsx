import { useState } from 'react'
import style from '../bulletinboard.module.scss'
import SidebarChatCard from '@/components/parts/Card/Bulletinboard/Sidebar'
import apiClient from '@/libs/apiClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  selectBoard: any
  boardRooms: any
  setBoardRooms: any
}

const MessageSidebar = (props: Props) => {
  const { selectBoard, boardRooms, setBoardRooms } = props

  const [sideMessagrBar, setSideMessagrBar] = useState<any>(selectBoard.messages)
  const { userId, username, iconPath } = useSelector((state: RootState) => state.user)

  const [input, setInput] = useState<string>('')

  const handleSubmit = async () => {
    try {
      if (input.length === 0) throw new Error('入力してください')
      const newRoom = await apiClient.post(`/post/boards/${selectBoard.id}/messages`, {
        content: input,
        authorId: userId,
        authorName: username,
        authorAvatar: iconPath,
      })
      setSideMessagrBar(newRoom.data.board.messages)
      console.log(newRoom.data.board)
      setBoardRooms(
        boardRooms.map((obj: { id: any }) =>
          obj.id === newRoom.data.board.id ? newRoom.data.board : obj,
        ),
      )
      setInput('')
    } catch {
      alert('投稿に失敗しました')
      setInput('')
    }
  }

  return (
    <div className={style.side}>
      <div className={style.side_header}>
        <SidebarChatCard selectBoard={selectBoard} avater={selectBoard.authorAvatar}>
          <span className={style.card_title}>{selectBoard.content}</span>
        </SidebarChatCard>
        <p className={style.bottom_border}>その他の返信</p>
      </div>
      <div>
        {sideMessagrBar.map((sideChat: any) => (
          <SidebarChatCard sideChat={sideChat} avater={sideChat.authorAvatar}>
            {sideChat.content}
          </SidebarChatCard>
        ))}
      </div>
      <div className={style.sidebar_input_area}>
        <input
          type='text'
          className={style.sidebar_input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={style.sidebar_search_icon}
          width='30'
          height='30'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#ffffff'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={handleSubmit}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 5l0 14' />
          <path d='M5 12l14 0' />
        </svg>
      </div>
    </div>
  )
}

export default MessageSidebar
