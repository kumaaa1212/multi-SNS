import React from 'react'
import style from '../Chat.module.scss'
import { AuthInfo } from '@/context/auth'
import ChatSearch from '@/components/parts/Search/ChatSearch'
import ChatSide from '@/components/parts/Chat/ChatSide'
import NewChatIcon from 'public/svg/newChat.svg'
import ChatSetting from 'public/svg/chat_setting.svg'
import MultipleSelectNative from '@/components/parts/Select/Native'

const SideBar = (props: any) => {
  const { chatRoom, setChatRoom, rooms } = props
  const [followListm, setFollowList] = React.useState(false)
  const auth = AuthInfo()
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_header}>
        <ChatSetting className={style.settingIcon} />
        <ChatSearch />
        <div>
          <NewChatIcon className={style.addIcon} onClick={() => setFollowList(!followListm)} />
          {followListm && (
            <div className={style.new_chat}>
              <MultipleSelectNative />
            </div>
          )}
        </div>
      </div>
      <div className={style.chat_person}>
        {rooms.rooms.map((room: any) => (
          <ChatSide setChatRoom={setChatRoom} />
        ))}
      </div>
    </div>
  )
}

export default SideBar
