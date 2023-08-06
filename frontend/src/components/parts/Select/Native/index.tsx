import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import apiClient from '@/libs/apiClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Image from 'next/image'
import style from './Native.module.scss'
import Icongenerate from '../../Avater'
import { useRouter } from 'next/router'

interface FrendInfo {
  icon: string
  username: string
  authorId: string
}

export default function MultipleSelectNative(props:any) {
  const { rooms } = props
  console.log(rooms)
  const { userId, follow } = useSelector((state: RootState) => state.user)
  console.log(follow)
  const addPerson = follow?.filter((person) => rooms.every((room: any) => room.user2Id !== person.authorId))
  const router = useRouter()

  const handleAddNewPerson = async (info: FrendInfo) => {
    const { icon, username, authorId } = info
    await apiClient.post('/chat/newroom', {
      user1Id: userId,
      user2Id: authorId,
      user2Name: username,
      user2Icon: icon,
    })
    router.reload()
  }

  return (
    <div className={style.chat_new_area}>
      {addPerson.map((person) => (
        <div className={style.new_chat_person} onDoubleClick={() => handleAddNewPerson(person)}>
          <Image
            src={Icongenerate(person.icon)}
            alt={''}
            width={40}
            height={40}
            className={style.new_chat_person_img}
          />
          <span>{person.username}</span>
        </div>
      ))}
    </div>
  )
}
