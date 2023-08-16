import { useState } from 'react'
import Profile from './profile'
import BasicTabs from './timeline'
import TweetModal from '@/components/widgets/Modal/Tweet'

const Mapage = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className='mypage'>
      <Profile setOpen={setOpen} />
      <BasicTabs />
      {open && <TweetModal open={open} setOpen={setOpen} />}
    </div>
  )
}

export default Mapage
