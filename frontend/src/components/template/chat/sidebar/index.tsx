import React from 'react'
import style from '../Chat.module.scss'
import ChatSearch from '@/components/parts/Search/ChatSearch'
import NewChatIcon from 'public/svg/newChat.svg'
import ChatSetting from 'public/svg/chat_setting.svg'
import MultipleSelectNative from '@/components/parts/Select/Native'
import ChatSide from '@/components/parts/chat/ChatSide'

const SideBar = (props: any) => {
  const {  setChatRoom, rooms } = props
  const [followListm, setFollowList] = React.useState(false)
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_header}>
        <ChatSetting className={style.settingIcon} />
        <ChatSearch />
        <div>
          <NewChatIcon className={style.addIcon} onClick={() => setFollowList(!followListm)} />
          {followListm && (
            <div className={style.new_chat}>
              <MultipleSelectNative rooms={rooms} />
            </div>
          )}
        </div>
      </div>
      <div className={style.chat_person}>
        {rooms?.map((room: any) => (
          <ChatSide setChatRoom={setChatRoom} room={room} />
        ))}
      </div>
    </div>
  )
}

export default SideBar
