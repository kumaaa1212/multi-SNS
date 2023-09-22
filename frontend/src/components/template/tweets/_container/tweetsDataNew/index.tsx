import React, { useState } from 'react'
import { TweetsType } from 'types/internal/tweet'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import TweetCard from 'components/parts/Card/Tweet'
import TweetArea from 'components/widgets/Article/Tweet'
import HomeTweetModal from 'components/widgets/Modal/Home/Tweet'
import style from '../index.module.scss'

interface Props {
  albumserch: string
  tweetsNew: TweetsType[]
}

export default function TweetNew(props: Props): JSX.Element {
  const { tweetsNew, albumserch } = props

  const [open, setOpen] = useState(false)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweetsNew[0])
  const tweetsNewFilter = tweetsNew.filter((tweet) => tweet.content.includes(albumserch))

  return (
    <TweetArea>
      {tweetsNewFilter?.map((tweet) => (
        <>
          <div className={style.large}>
            <TweetCard tweet={tweet} key={tweet.id} />
          </div>
          <div className={style.small}>
            <HomeTweetCard tweet={tweet} setOpen={setOpen} setShowTweets={setShowTweets} />
          </div>
        </>
      ))}
      <HomeTweetModal open={open} setOpen={setOpen} showTweets={showTweets} />
    </TweetArea>
  )
}
