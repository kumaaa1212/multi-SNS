import TweetCard from 'components/parts/Card/Tweet'
import ModalBase from 'components/parts/Modal'
import ModalIcon from '/public/svg/modal_close.svg'
import { TweetsType } from 'types/internal/tweet'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  showTweets: TweetsType
  handleDelete: (album: TweetsType) => void
}

export default function HomeTweetModal(props: Props): JSX.Element {
  const { open, setOpen, showTweets, handleDelete } = props

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div>
        <div>
          <ModalIcon onClick={(): void => setOpen(false)} className='cursor_pointer' />
        </div>
        <TweetCard tweet={showTweets} handleDelete={handleDelete} />
      </div>
    </ModalBase>
  )
}
