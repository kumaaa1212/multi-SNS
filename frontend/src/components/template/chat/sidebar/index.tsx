import { Dispatch, SetStateAction, useState } from 'react'
import ChatSearch from '@/components/parts/Search/ChatSearch'
import NewChatIcon from 'public/svg/newChat.svg'
import ChatSetting from 'public/svg/chat_setting.svg'
import MultipleSelectNative from '@/components/parts/Select/Native'
import ChatSide from '@/components/parts/chat/ChatSide'
import style from '../Chat.module.scss'
import { RoomType } from '@/types/global'

interface Props {
  rooms: RoomType[]
  selectChatRoom: boolean
  setSelectChatRoom: Dispatch<SetStateAction<boolean>>
  setSelectRoom: Dispatch<SetStateAction<RoomType[]>>
}

const SideBar = (props: Props) => {
  const { setSelectChatRoom, setSelectRoom, rooms, selectChatRoom } = props

  const [followListm, setFollowList] = useState<boolean>(false)

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_header}>
        <ChatSetting className={style.settingIcon} />
        <ChatSearch />
        <div>
          <NewChatIcon
            className={style.addIcon}
            onClick={(): void => setFollowList(!followListm)}
          />
          {followListm && (
            <div className={style.new_chat}>
              <MultipleSelectNative rooms={rooms} />
            </div>
          )}
        </div>
      </div>
      <div className={style.chat_person}>
        {rooms?.map((room: RoomType) => (
          <ChatSide
            selectChatRoom={selectChatRoom}
            setSelectChatRoom={setSelectChatRoom}
            rooms={rooms}
            room={room}
            setSelectRoom={setSelectRoom}
          />
        ))}
      </div>
    </div>
  )
}

export default SideBar
