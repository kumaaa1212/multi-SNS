import { useState } from 'react'
import TweetModal from 'components/widgets/Modal/Tweet'
import Profile from './profile'
import BasicTabs from './timeline'

const Mapage = (): JSX.Element => {
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
