import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from 'components/hooks/useToast'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { BoardType, BoardMessageType } from 'types/global'
import SidebarChatCard from 'components/parts/Card/Bulletinboard/Sidebar'
import SendInput from 'components/parts/Input/Send'
import ToastBase from 'components/parts/Toast'
import style from '../bulletinboard.module.scss'

interface Props {
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
}

const MessageSidebar = (props: Props): JSX.Element => {
  const { selectBoard, setSelectBoard } = props

  const { userId, username, iconPath } = useSelector((state: RootState) => state.user)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [sideMessagrBar, setSideMessagrBar] = useState<BoardMessageType[]>(
    selectBoard?.messages || [],
  )
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
      toastFunc('メッセージの送信に失敗しました', true)
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
        {sideMessagrBar.map((sideChat: BoardMessageType) => (
          <SidebarChatCard contents={sideChat} avater={sideChat.authorAvatar} key={sideChat.id}>
            {sideChat.content}
          </SidebarChatCard>
        ))}
      </div>
      <SendInput
        input={input}
        setInput={setInput}
        handleSend={handleSubmit}
        placeholder='メッセージを入力'
      />
      <ToastBase content={toastContent} isError={isError} active={isToast} />
    </div>
  )
}

export default MessageSidebar
