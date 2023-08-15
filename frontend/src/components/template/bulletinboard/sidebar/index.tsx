import { useState } from 'react'
import style from '../bulletinboard.module.scss'
import SidebarChatCard from '@/components/parts/Card/Bulletinboard/Sidebar'
import apiClient from '@/libs/apiClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  selectBoard: any
}

const MessageSidebar = (props: Props) => {
  const [sideMessagrBar, setSideMessagrBar] = useState<any>([])
  const {  userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const { selectBoard } = props

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
    } catch {
      alert('投稿に失敗しました')
      setInput('')
    }
  }

  console.log(sideMessagrBar)
  console.log(selectBoard.messages)

  return (
    <div className={style.side}>
      <div className={style.side_main_chat}>
        <SidebarChatCard selectBoard={selectBoard}>
          <p>{selectBoard.content}</p>
        </SidebarChatCard>
        <p className={style.bottom_border}>その他の返信</p>
      </div>
      <div>
        {selectBoard.messages.map((message: any) => (
          <SidebarChatCard message={message}>{message.content}</SidebarChatCard>
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
