import { Dispatch, SetStateAction, useState } from 'react'
import Chatlist from 'components/template/chat/_container/sidebar/_container/Chatlist'
import { RoomType } from 'types/internal'
import NewChatIcon from '/public/svg/newchat.svg'
import style from './Sidebar.module.scss'
import MultipleSelectNative from 'components/parts/Select'

interface Props {
  rooms: RoomType[]
  roomState: RoomType[]
  setRoomState: Dispatch<SetStateAction<RoomType[]>>
  toastFunc: (content: string, isError: boolean) => void
  setLoading: Dispatch<SetStateAction<boolean>>
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType | undefined>>
}

export default function SideBar(props: Props): JSX.Element {
  const { rooms, toastFunc, setSelectChatRoom, setSelectRoom } = props
  const { roomState, setRoomState, selectChatRoom, setLoading } = props

  const [followListm, setFollowList] = useState<boolean>(false)
  const [serchInput, setSerchInput] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value.toLowerCase()
    setSerchInput(inputValue)
    if (inputValue === '') {
      setRoomState(rooms)
      return
    }
    const filteredRooms = rooms.filter((room) => {
      return (
        room.user1Name.toLowerCase().includes(inputValue) ||
        room.user2Name.toLowerCase().includes(inputValue)
      )
    })
    setRoomState(filteredRooms)
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_header}>
        <input
          type='text'
          value={serchInput}
          onChange={handleSearch}
          placeholder='Search for a chat'
          className={style.sidebar_input}
        />
        <div>
          <NewChatIcon
            className={style.addIcon}
            onClick={(): void => setFollowList(!followListm)}
          />
          {followListm && (
            <div className={style.new_chat}>
              <MultipleSelectNative
                toastFunc={toastFunc}
                setLoading={setLoading}
                myListRooms={roomState}
                setMyListRooms={setRoomState}
              />
            </div>
          )}
        </div>
      </div>

      <div className={style.chat_person}>
        {roomState?.map((room: RoomType) => (
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
