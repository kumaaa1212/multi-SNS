import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { MessageType, RoomType } from 'types/internal'
import ButtonBase from 'components/parts/Button/Base'
import ChatContent from 'components/parts/Card/Chat'
import SendInput from 'components/parts/Input/Send'
import style from './Main.module.scss'

interface Props {
  setRoomState: React.Dispatch<React.SetStateAction<RoomType[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  toastFunc: (content: string, isError: boolean) => void
  selectRoom: RoomType
  setSelectRoom: React.Dispatch<React.SetStateAction<RoomType>>
  selectChatRoom: boolean
  setSelectChatRoom: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatArea(props: Props): JSX.Element {
  const { setRoomState, setLoading, toastFunc, selectRoom, setSelectRoom } = props
  const { selectChatRoom, setSelectChatRoom } = props

  const { follow, userId, iconPath, icon, bio, team, twitterURL, teamURL, username } = useSelector(
    (state: RootState) => state.user,
  )
  const [input, setInput] = useState<string>('')
  const [filterFrend, setFilterFrend] = useState<boolean>(false)
  useEffect(() => {
    if (!selectRoom) return
    const filterFrend: boolean = follow.some((frend) => {
      return selectRoom.user1Id === String(frend.frendId) || selectRoom.user1Id === String(userId)
    })
    setFilterFrend(filterFrend)
  }, [follow, selectRoom, userId])

  const handleSend = async (): Promise<void> => {
    if (!input) return
    setLoading(true)
    try {
      await apiClient
        .post('/chat/room/add/message', {
          roomId: selectRoom.id,
          content: input,
          authorId: userId,
          senderId: selectRoom.user2Id,
        })
        .then((res) => {
          setSelectRoom(res.data.updatedRoom)
        })
      setInput('')
    } catch {
      toastFunc('メッセージの送信に失敗しました', true)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .delete('/chat/room/delete', {
        params: {
          roomId: selectRoom.id,
          authorId: userId,
        },
      })
      .then((res) => {
        setRoomState(res.data.rooms)
        setLoading(false)
        setSelectChatRoom(false)
      })
  }
  const handleFollow = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .post('/auth/follow', {
        authorId: selectRoom.user1Id,
        userId,
        name: username,
        icon: iconPath || icon,
        bio,
        team,
        twitterURL,
        teamURL,
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw new Error('Failed to follow user')
        setFilterFrend(true)
        setLoading(false)
      })
  }

  return (
    <div>
      {selectChatRoom && (
        <>
          <div className={style.contents}>
            <div className={style.chat_area_scroll}>
              {selectRoom?.messages?.map((message: MessageType) => (
                <ChatContent message={message} selectRoom={selectRoom} key={message.id} />
              ))}
            </div>
          </div>
          <div className={style.input_area}>
            {!filterFrend && (
              <Alert severity='info' className={style.alart_area}>
                <div className={style.message_area}>
                  <p>メッセージのリクエストが来ています。</p>
                  <p>※現在、メッセージの送信はできません</p>
                </div>
                <div className={style.handle_btn}>
                  <ButtonBase content='Follow' size='md' blue onClick={handleFollow} />
                  <ButtonBase
                    content='Reject'
                    size='md'
                    black
                    className='ml_40'
                    onClick={handleDelete}
                  />
                </div>
              </Alert>
            )}
            {filterFrend && (
              <div className={style.small}>
                <SendInput input={input} setInput={setInput} handleSend={handleSend} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
