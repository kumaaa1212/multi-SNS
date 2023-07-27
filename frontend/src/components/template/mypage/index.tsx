import { useState } from 'react'
import Profile from './profile'
import TimeLine from './timeline'
import style from './Mypage.module.scss'
import TweetModal from '@/components/wigets/Modal/Tweet'
import PostBtn from '@/components/parts/Button/Post/addbtn'
const Mapage = () => {
  const [open, setOpen] = useState<boolean>(false)
  console.log(open)
  return (
    <div>
      {open && <TweetModal open={open} setOpen={setOpen} />}
      <div className={style.profile}>
        <div className='profile_right'>
          <Profile />
        </div>
        <TimeLine />
      </div>
      <div className='add_btn'>
        <PostBtn setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Mapage
