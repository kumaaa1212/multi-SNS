import React from 'react'
import style from '../bulletinboard.module.scss'
import SidebarChatCard from '@/components/parts/Card/Bulletinboard/Sidebar'
const MessageSidebar = () => {
  return (
    <div className={style.side}>
      <div className={style.side_main_chat}>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <p className={style.bottom_border}>その他の返信</p>
      </div>
      <div>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
        <SidebarChatCard>
          <p>ssss</p>
        </SidebarChatCard>
      </div>
      <div className={style.sidebar_input_area}>
        <input type='text' className={style.sidebar_input} />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={style.sidebar_search_icon}
          width='30'
          height='30'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#ffffff'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 5l0 14' />
          <path d='M5 12l14 0' />
        </svg>
      </div>
    </div>
  )
}

export default MessageSidebar
