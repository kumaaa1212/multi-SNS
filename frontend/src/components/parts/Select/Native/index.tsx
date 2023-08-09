import { useEffect, useState } from 'react'
import apiClient from '@/libs/apiClient'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Image from 'next/image'
import Icongenerate from '../../Avater'
import { useRouter } from 'next/router'
import { RoomType } from '@/types/global'
import style from './Native.module.scss'

interface FrendInfo {
  icon: string
  username: string
  authorId: string
}

interface Props {
  rooms: RoomType[]
}

export default function MultipleSelectNative(props: Props) {
  const { rooms } = props

  const { userId, iconPath, username, follow } = useSelector((state: RootState) => state.user)
  const [filterSelectRoom, setFilterSelectRoom] = useState<RoomType[]>([])
  const router = useRouter()

  const addPerson = follow?.filter(
    (person) => rooms?.some((room) => room.user2Id === person.authorId || room.user1Id === person.authorId),
  )

  const handleAddNewPerson = async (info: FrendInfo) => {
    await apiClient.post('/chat/newroom', {
      user1Id: userId,
      user1Name: username,
      user1Icon: iconPath,
      user2Id: info.authorId,
      user2Name: info.username,
      user2Icon: info.icon,
    })
    router.reload()
  }

  // const fliterRooms = () => {
  //   const fillterRoom = rooms?.filter((room: RoomType) => room.user2Id === userId || room.user1Id === userId)
  //   setFilterSelectRoom(fillterRoom)
  // }

  useEffect(() => {
    // fliterRooms()
  }, [])

  return (
    <div className={style.chat_new_area}>
      {addPerson.length === 0 ? (
        <p className={style.chat_noadd}>追加できるユーザーがいません</p>
      ) : (
        <div>
          <div>
            {addPerson.map((person) => (
              <div
                className={style.new_chat_person}
                onDoubleClick={() => handleAddNewPerson(person)}
              >
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
          <div>
            {filterSelectRoom.map((person) => (
              <div className={style.new_chat_person}>
                <Image
                  src={Icongenerate(person.user2Icon)}
                  alt={''}
                  width={40}
                  height={40}
                  className={style.new_chat_person_img}
                />
                <span>{person.user2Name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
