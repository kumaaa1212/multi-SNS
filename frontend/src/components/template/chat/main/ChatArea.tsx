import React, { use, useEffect, useState } from 'react'
import style from '../Chat.module.scss'
import Image from 'next/image'
import Img from '../../../../public/testImg1.jpg'
import ChatContent from '@/components/parts/chat/ChatContent'
import SendInput from '@/components/parts/Input'
import apiClient from '@/libs/apiClient'
import { Room } from '@/types/global'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Props {
  selectRoom: Room
}

const ChatArea = (props: Props) => {
  const { selectRoom } = props
  const router = useRouter()
  const { userId } = useSelector((state: RootState) => state.user)

  const [input, setInput] = useState<string>('')

  // useEffect(() => {
  //   const dataFetch = async () => {
  //     const res =  await apiClient.get(`/chat/room/select/${selectRoom.id}`)
  //     console.log(res.data)
  //   }
  //   dataFetch()
  //   router.reload()
  // }, [input])

  const handleSend = async () => {
    await apiClient.post('/chat/room/add/message', {
      roomId: selectRoom.id,
      content: input,
      authorId: userId,
      senderId: selectRoom.user2Id,
    })
    router.reload()
  }

  return (
    <div className={style.chat_area}>
      <div className={style.chat_area_scroll}>
        {selectRoom?.messages.map((message: any) => (
          <ChatContent message={message} selectRoom={selectRoom} />
        ))}
        <SendInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  )
}

export default ChatArea
