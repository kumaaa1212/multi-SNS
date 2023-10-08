import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chatlist from 'components/template/chat/_container/sidebar/_container/Chatlist'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import NewChatIcon from '/public/svg/newchat.svg'
import style from './Sidebar.module.scss'
import ChatSearch from 'components/parts/Search'
import MultipleSelectNative from 'components/parts/Select'

interface Props {
  rooms: RoomType[]
  toastFunc: (content: string, isError: boolean) => void
  setLoading: Dispatch<SetStateAction<boolean>>
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType>>
}

export default function SideBar(props: Props): JSX.Element {
  const { toastFunc, setSelectChatRoom, setSelectRoom, rooms, selectChatRoom, setLoading } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [followListm, setFollowList] = useState<boolean>(false)
  const [myListRooms, setMyListRooms] = useState<RoomType[]>(rooms)
  const [serchInput, setSerchInput] = useState<string>('')

  useEffect(() => {
    setLoading(false)
    const roomFetch = async (): Promise<void> => {
      try {
        await apiClient.get(`/chat/allrooms/${userId}`).then((res) => {
          setMyListRooms(res.data.rooms)
        })
      } catch {
        toastFunc('エラーが発生しました', true)
      } finally {
        setLoading(false)
      }
    }
    roomFetch()
  }, [setLoading, toastFunc, userId])

  const handleSerch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSerchInput(e.target.value)
    if (e.target.value === '') return setMyListRooms(rooms)
    const filterRoom = myListRooms.filter((room) => {
      return (
        room.user1Name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        room.user2Name.toLowerCase().includes(e.target.value.toLowerCase())
      )
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
              <MultipleSelectNative
                toastFunc={toastFunc}
                setLoading={setLoading}
                myListRooms={myListRooms}
                setMyListRooms={setMyListRooms}
              />
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
