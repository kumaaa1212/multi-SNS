import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ChatSearch from '@/components/parts/Search/ChatSearch'
import NewChatIcon from 'public/svg/newChat.svg'
import ChatSetting from 'public/svg/chat_setting.svg'
import MultipleSelectNative from '@/components/parts/Select/Native'
import Chatlist from '@/components/parts/chat/ChatSide'
import style from '../Chat.module.scss'
import { RoomType } from '@/types/global'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Badge } from '@mui/material'

interface Props {
  rooms: RoomType[]
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType[]>>
}

const SideBar = (props: Props) => {
  const { setSelectChatRoom, setSelectRoom, rooms, selectChatRoom } = props
  const { userId, follow } = useSelector((state: RootState) => state.user)

  const [followListm, setFollowList] = useState<boolean>(false)
  const [settingArea, setSettingArea] = useState<boolean>(false)
  const [myRooms, setMyRooms] = useState<RoomType[]>([])
  const [roomsData, setRoomsData] = useState<RoomType[]>(rooms)

  useEffect(() => {
    const filterMyRooms = rooms?.filter((room: any) =>
      follow.some(
        (person) =>
          (person.authorId === room.user1Id && room.user2Id === userId) ||
          (person.authorId === room.user2Id && room.user1Id === userId),
      ),
    )
    setMyRooms(filterMyRooms)
  }, [])

  return (
    <div className='chat_sidebar'>
      <div className={style.sidebar}>
        <div className={style.sidebar_header}>
          <Badge badgeContent={4} color='primary'>
            <ChatSetting
              className={style.settingIcon}
              onClick={() => setSettingArea(!settingArea)}
            />
            {settingArea && (
              <div className={style.setting_area}>
                <span>Message Rqquests</span>
                <span>メッセージを編集</span>
              </div>
            )}
          </Badge>
          <ChatSearch />
          <div>
            <NewChatIcon
              className={style.addIcon}
              onClick={(): void => setFollowList(!followListm)}
            />
            {followListm && (
              <div className={style.new_chat}>
                <MultipleSelectNative myRooms={myRooms} setMyRooms={setMyRooms} />
              </div>
            )}
          </div>
        </div>

        <div className={style.chat_person}>
          {myRooms?.map((room: RoomType) => (
            <Chatlist
              selectChatRoom={selectChatRoom}
              setSelectChatRoom={setSelectChatRoom}
              myRooms={myRooms}
              room={room}
              setSelectRoom={setSelectRoom}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
