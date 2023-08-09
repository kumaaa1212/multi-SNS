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
  const [selectFrend, setSelectFrend] = useState<FrendInfo[]>([])
  const router = useRouter()

  useEffect(() => {
    addPerson()
  },[follow])

  const addPerson = () => {
    if (!follow || !rooms) {
      return; // followかroomsが未定義の場合は処理しない
    }
  
    const filteredPeople = follow.filter((person) => {
      return !rooms.some(
        (room) =>
          room.user2Id === person.authorId || room.user1Id === person.authorId
      );
    });
  
    setSelectFrend(filteredPeople);
  };
  
  console.log(rooms)
  console.log(follow)

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
          </div>
        </div>
      )}
    </div>
  )
}
