import React from 'react'
import styles from './Chat.module.scss'
import { AuthInfo } from '@/context/auth'
import ChatSearch from '@/components/parts/Search/ChatSearch'
import ChatSide from '@/components/parts/Chat/ChatSide'
import NewChatIcon from '../../../../public/svg/newChat.svg'
import ChatSetting from '../../../../public/svg/chat_setting.svg'
import MultipleSelectNative from '@/components/parts/Select/Native'
import apiClient from '@/libs/apiClient'
import { GetServerSideProps } from 'next'

const SideBar = (props: any) => {
  const { chatRoom, setChatRoom, rooms } = props
  const [followListm, setFollowList] = React.useState(false)
  const auth = AuthInfo()
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <ChatSetting className={styles.settingIcon} />
        <ChatSearch />
        <div>
          <NewChatIcon className={styles.addIcon} onClick={() => setFollowList(!followListm)} />
          {followListm && (
            <div className={styles.new_chat}>
              <MultipleSelectNative />
            </div>
          )}
        </div>
      </div>
      <div className={styles.chat_person}>
        {rooms.rooms.map((room: any) => (
          <ChatSide setChatRoom={setChatRoom} />
        ))}
      </div>
    </div>
  )
}

export default SideBar
