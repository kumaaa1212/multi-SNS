import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import { RoomType } from 'types/internal'
import style from './Native.module.scss'

interface FrendInfo {
  icon: string
  username: string
  authorId: string
}

interface Props {
  myRooms: RoomType[]
  setMyRooms: Dispatch<SetStateAction<RoomType[]>>
}

export default function MultipleSelectNative(props: Props): JSX.Element {
  const { myRooms, setMyRooms } = props

  const { userId, iconPath, username, follow } = useSelector((state: RootState) => state.user)
  const [selectFrend, setSelectFrend] = useState<FrendInfo[]>([])
  const router = useRouter()

  const handleSelectFrend = () => {
    const filterFrend = follow.filter(
      (person) =>
        !myRooms?.some(
          (room) =>
            (room.user1Id === person.authorId && room.user2Id === userId) ||
            (room.user2Id === person.authorId && room.user1Id === userId),
        ),
    )
    setSelectFrend(filterFrend)
  }

  useEffect(() => {
    handleSelectFrend()
  }, [])

  const handleAddNewPerson = async (info: FrendInfo) => {
    try {
      const newChatRoom = await apiClient.post('/chat/newroom', {
        user1Id: userId,
        user1Name: username,
        user1Icon: iconPath,
        user2Id: info.authorId,
        user2Name: info.username,
        user2Icon: info.icon,
      })
      handleSelectFrend()
      setMyRooms(newChatRoom.data.room)
      // setMyRooms((prev) => [...prev, newChatRoom.data.room])
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
                key={person.authorId}
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
        </div>
      )}
    </div>
  )
}
