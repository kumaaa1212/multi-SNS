import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import { FrendInfo, RoomType } from 'types/internal'
import style from './Native.module.scss'

// interface FrendInfo {
//   icon: string
//   username: string
//   authorId: string
// }

interface Props {
  myRooms: RoomType[]
  setMyRooms: Dispatch<SetStateAction<RoomType[]>>
}

export default function MultipleSelectNative(props: Props): JSX.Element {
  const { myRooms, setMyRooms } = props

  const { userId, iconPath, icon, username, follow } = useSelector((state: RootState) => state.user)
  const [selectFrend, setSelectFrend] = useState<FrendInfo[]>([])
  const router = useRouter()

  useEffect(() => {
    const handleSelectFrend = (): void => {
      const filterFrend = follow.filter((person) => {
        return myRooms.some(
          (room) =>
            (person.userId === room.user1Id && person.frendId === room.user2Id) ||
            (person.userId === room.user2Id && person.frendId === room.user1Id),
        )
      })
      setSelectFrend(filterFrend)
    }
    handleSelectFrend()
  }, [follow, myRooms])

  const handleAddNewPerson = async (info: FrendInfo): Promise<void> => {
    try {
      const newChatRoom = await apiClient.post('/chat/newroom', {
        user1Id: userId,
        user1Name: username,
        user1Icon: icon || iconPath,
        user2Id: info.frendId,
        user2Name: info.name,
        user2Icon: info.icon,
      })
      setMyRooms((prev) => [...prev, newChatRoom.data.room])
    } catch {
      alert('チャットルームの作成に失敗しました')
    }
  }
  return (
    <div className={style.chat_new_area}>
      {selectFrend.length === 0 ? (
        <p className={style.chat_noadd}>追加できるユーザーがいません</p>
      ) : (
        <div>
          <div>
            {selectFrend.map((person) => (
              <div
                className={style.new_chat_person}
                onClick={(): void => {
                  handleAddNewPerson(person)
                }}
                key={person.userId}
              >
                <Image
                  src={Icongenerate(person.icon)}
                  alt={''}
                  width={40}
                  height={40}
                  className={style.new_chat_person_img}
                />
                <span>{person.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
