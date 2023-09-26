import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import { FrendInfo, RoomType } from 'types/internal'
import style from './Native.module.scss'

interface Props {
  myListRooms: RoomType[]
  setMyListRooms: Dispatch<SetStateAction<RoomType[]>>
}

export default function MultipleSelectNative(props: Props): JSX.Element {
  const { myListRooms, setMyListRooms } = props

  const { userId, iconPath, icon, username, follow } = useSelector((state: RootState) => state.user)
  const [selectFrend, setSelectFrend] = useState<FrendInfo[]>(follow)

  useEffect(() => {
    const filterRoomas = follow.filter((person) => {
      return !myListRooms.some((room) => {
        return (
          (room.user1Id === person.userId && room.user2Id === userId) ||
          (room.user2Id === person.userId && room.user1Id === userId)
        )
      })
    })
    setSelectFrend(filterRoomas)
  }, [follow, myListRooms, userId])

  const handleAddNewPerson = async (info: FrendInfo): Promise<void> => {
    try {
      await apiClient
        .post('/chat/newroom', {
          user1Id: userId,
          user1Name: username,
          user1Icon: icon || iconPath,
          user2Id: info.frendId,
          user2Name: info.name,
          user2Icon: info.icon,
        })
        .then((res) => {
          setSelectFrend((prev) => prev.filter((person) => person.frendId !== info.userId))
        })
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
