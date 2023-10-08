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
    const filterFreds = follow.filter((person) => {
      return !myListRooms?.some((room) => {
        return (
          (room.user1Id === person.frendId && room.user2Id === userId) ||
          (room.user2Id === person.frendId && room.user1Id === userId)
        )
      })
    })
    setSelectFrend(filterFreds)
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
          if (res.status !== 200) return
          setMyListRooms(res.data.allRooms)
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
            {selectFrend.map((person, index) => (
              <div
                className={style.new_chat_person}
                onClick={(): void => {
                  handleAddNewPerson(person)
                }}
                key={index}
              >
                <Image
                  src={Icongenerate(person.icon)}
                  alt='icon'
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
