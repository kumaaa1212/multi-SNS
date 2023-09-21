import { TweetsType } from 'types/internal'
import TweetCard from 'components/parts/Card/Tweet'
import ModalBase from 'components/parts/Modal'
import ModalIcon from '/public/svg/modal_close.svg'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  showTweets: TweetsType
}

export default function HomeTweetModal(props: Props): JSX.Element {
  const { open, setOpen, showTweets } = props

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div>
        <div>
          <ModalIcon onClick={(): void => setOpen(false)} className='cursor_pointer' />
        </div>
        <TweetCard tweet={showTweets} />
      </div>
    </ModalBase>
  )
}
