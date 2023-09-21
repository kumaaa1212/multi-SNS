import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Badge } from '@mui/material'
import { RootState } from 'store/store'
import { RoomType } from 'types/internal'
import ChatSearch from 'components/parts/Search'
import NewChatIcon from '/public/svg/newChat.svg'
import ChatSetting from '/public/svg/chat_setting.svg'
import MultipleSelectNative from 'components/parts/Select'
import Chatlist from 'components/parts/Chat/ChatSide'
import SettingsIcon from '/public/svg/message_settings.svg'
import RequestIcon from '/public/svg/message_request.svg'
import style from './Sidebar.module.scss'

interface Props {
  rooms: RoomType[]
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType[]>>
}

const SideBar = (props: Props): JSX.Element => {
  const { setSelectChatRoom, setSelectRoom, rooms, selectChatRoom } = props
  const { userId, follow } = useSelector((state: RootState) => state.user)

  const [followListm, setFollowList] = useState<boolean>(false)
  const [settingArea, setSettingArea] = useState<boolean>(false)
  const [myRooms, setMyRooms] = useState<RoomType[]>([])
  const [roomsData, setRoomsData] = useState<RoomType[]>(rooms)

  useEffect(() => {
    const filterMyRooms = rooms?.filter((room: RoomType) =>
      follow.some(
        (person) =>
          (person.userId === room.user1Id && room.user2Id === userId) ||
          (person.userId === room.user2Id && room.user1Id === userId),
      ),
    )
    setMyRooms(filterMyRooms)
  }, [follow, rooms, userId])

  return (
    <div className='chat_sidebar'>
      <div className={style.sidebar}>
        <div className={style.sidebar_header}>
          <Badge badgeContent={4} color='primary'>
            <ChatSetting
              className={style.settingIcon}
              onClick={(): void => setSettingArea(!settingArea)}
            />
            {settingArea && (
              <div className={style.setting_area}>
                <div className={style.message_request}>
                  <RequestIcon />
                  <p>Message Rqquests</p>
                </div>
                <div className={style.message_setting}>
                  <SettingsIcon />
                  <p>メッセージを編集</p>
                </div>
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
              key={room.id}
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
