import { useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { BoardType, MessageType } from 'types/global'
import SidebarChatCard from 'components/parts/Card/Bulletinboard/Sidebar'
import style from '../bulletinboard.module.scss'

interface Props {
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
}

const MessageSidebar = (props: Props): JSX.Element => {
  const { selectBoard, setSelectBoard } = props

  const { userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const [sideMessagrBar, setSideMessagrBar] = useState<MessageType[]>(selectBoard?.messages || [])
  const [input, setInput] = useState<string>('')

  const handleSubmit = async (): Promise<void> => {
    try {
      if (input.length !== 0 && selectBoard) {
        const newBoard = await apiClient.post(`/board/boards/${selectBoard.id}/messages`, {
          content: input,
          authorId: userId,
          authorName: username,
          authorAvatar: iconPath,
        })
        setSideMessagrBar(newBoard.data.board.messages)
        setSelectBoard(newBoard.data.board)
      }
      setInput('')
    } catch {
      alert('投稿に失敗しました')
      setInput('')
    }
  }

  return (
    <div className={style.side}>
      <div className={style.side_header}>
        <SidebarChatCard contents={selectBoard} avater={selectBoard?.authorAvatar}>
          {selectBoard?.content}
        </SidebarChatCard>
        <p className={style.bottom_border}>その他の返信</p>
      </div>
      <div>
        {sideMessagrBar.map((sideChat: MessageType) => (
          <SidebarChatCard contents={sideChat} avater={sideChat.authorAvatar} key={sideChat.id}>
            {sideChat.content}
          </SidebarChatCard>
        ))}
      </div>
      <div className={style.sidebar_input_area}>
        <input
          type='text'
          className={style.sidebar_input}
          value={input}
          onChange={(e): void => setInput(e.target.value)}
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
