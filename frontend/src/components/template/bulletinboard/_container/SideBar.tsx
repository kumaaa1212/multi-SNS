import { useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import { useToast } from 'components/hooks/useToast'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { BoardMessageType, BoardType } from 'types/internal/board'
import SidebarChatCard from 'components/parts/Card/Board/Sidebar'
import SendInput from 'components/parts/Input/Send'
import ToastBase from 'components/parts/Toast'
import style from './Bulletinboard.module.scss'

interface Props {
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
}

export default function MessageSidebar(props: Props): JSX.Element {
  const { selectBoard, setSelectBoard } = props

  const { userId, username, iconPath, icon } = useSelector((state: RootState) => state.user)
  const { toastContent, isError, isToast, toastFunc } = useToast()
  const [input, setInput] = useState<string>('')

  const handleSubmit = async (): Promise<void> => {
    if (input.length !== 0 && selectBoard) {
      await apiClient
        .post(`/board/boards/${selectBoard.id}/messages`, {
          content: input,
          authorId: userId,
          authorName: username,
          authorAvatar: iconPath ? iconPath : icon,
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) {
            toastFunc('メッセージの送信に失敗しました', true)
            setInput('')
          } else {
            setSelectBoard(res.data.board)
            setInput('')
          }
        })
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
      <div className={style.side_main}>
        {selectBoard?.messages.map((sideChat: BoardMessageType) => (
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
