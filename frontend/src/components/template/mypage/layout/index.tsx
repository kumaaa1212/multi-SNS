import TweetModal from '@/components/wigets/Modal/Tweet'
import React, { useState } from 'react'
import style from './Layout.module.scss'
import PostBtn from '@/components/parts/Button/Post/addbtn'
import Profile from '../profile'
import TimeLineHeader from './header'
const MypageLayout = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
      {open && <TweetModal open={open} setOpen={setOpen} />}
      <div className={style.mypage}>
        <div className={style.mypage_profile}>
          <Profile />
        </div>
        <div className={style.mypage_timeline}>
          <TimeLineHeader />
          <div className={style.timeline_area}>{children}</div>
        </div>
      </div>
      <PostBtn setOpen={setOpen} />
    </div>
  )
}

export default MypageLayout
