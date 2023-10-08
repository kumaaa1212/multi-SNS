import { TweetsType } from 'types/internal/tweet'
import Loading from 'components/layout/Loading'
import TweetCard from 'components/parts/Card/Tweet'
import SmallTweetCard from 'components/parts/Card/Tweet/Small'
import ModalBase from 'components/parts/Modal'
import ModalIcon from '/public/svg/modal_close.svg'
import style from './Tweet.module.scss'

interface Props {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  setOpen: (open: boolean) => void
  showTweets: TweetsType
  handleDelete: (album: TweetsType) => void
}

export default function HomeTweetModal(props: Props): JSX.Element {
  const { loading, setLoading, open, setOpen, showTweets, handleDelete } = props

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div>
        <div>
          <ModalIcon onClick={(): void => setOpen(false)} className='cursor_pointer' />
        </div>
        <div>
          <div className={style.large}>
            <TweetCard tweet={showTweets} handleDelete={handleDelete} setLoading={setLoading} />
          </div>
          <div className={style.small}>
            <SmallTweetCard
              tweet={showTweets}
              handleDelete={handleDelete}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </ModalBase>
  )
}
