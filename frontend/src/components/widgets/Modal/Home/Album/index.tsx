import { useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal/tweet'
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

  const [tweetsData, setTweetsData] = useState<TweetsType>(showTweets)

  const handleDelete = async (tweet: TweetsType): Promise<void> => {
    await apiClient
      .delete('/post/newTweet/delete', {
        params: {
          tweetId: tweet.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setTweetsData(res.data.remainingTweets)
      })
    setOpen(false)
  }

  return (
    <ModalBase open={open} onClose={setOpen}>
      <div>
        <div>
          <ModalIcon onClick={(): void => setOpen(false)} className='cursor_pointer' />
        </div>
        <TweetCard tweet={tweetsData} handleDelete={handleDelete} />
      </div>
    </ModalBase>
  )
}
