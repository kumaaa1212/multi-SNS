import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chatlist from 'components/template/chat/_container/sidebar/_container/Chatlist'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import ChatSearch from 'components/parts/Search'
import NewChatIcon from '/public/svg/newchat.svg'
import MultipleSelectNative from 'components/parts/Select'
import style from './Sidebar.module.scss'

interface Props {
  rooms: RoomType[]
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType>>
}

export default function SideBar(props: Props): JSX.Element {
  const { setSelectChatRoom, setSelectRoom, rooms, selectChatRoom } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [followListm, setFollowList] = useState<boolean>(false)
  const [myListRooms, setMyListRooms] = useState<RoomType[]>(rooms)
  const [serchInput, setSerchInput] = useState<string>('')

  useEffect(() => {
    const roomFetch = async (): Promise<void> => {
      await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
        setMyListRooms(res.data.rooms)
      })
    }
    roomFetch()
  }, [userId])

  const handleSerch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSerchInput(e.target.value)
    if (e.target.value === '') return setMyListRooms(rooms)
    const filterRoom = myListRooms.filter((room) => {
      room.user1Name.includes(e.target.value) || room.user2Name.includes(e.target.value)
    })
    setMyListRooms(filterRoom)
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_header}>
        <ChatSearch serchInput={serchInput} onChange={handleSerch} />
        <div>
          <NewChatIcon
            className={style.addIcon}
            onClick={(): void => setFollowList(!followListm)}
          />
          {followListm && (
            <div className={style.new_chat}>
              <MultipleSelectNative myListRooms={myListRooms} setMyListRooms={setMyListRooms} />
            </div>
          )}
        </div>
      </div>

      <div className={style.chat_person}>
        {myListRooms?.map((room: RoomType) => (
          <Chatlist
            key={room.id}
            selectChatRoom={selectChatRoom}
            setSelectChatRoom={setSelectChatRoom}
            room={room}
            setSelectRoom={setSelectRoom}
          />
        ))}
      </div>
    </div>
  )
}
