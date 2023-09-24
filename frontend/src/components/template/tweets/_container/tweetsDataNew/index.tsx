import React, { useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
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
  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweetsNew)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweetsNew[0])
  const tweetsNewFilter = tweetsData?.filter((tweet) => tweet.content.includes(albumserch))

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      const resLike = await apiClient.get('/article/all/tweets/order/new')
      if (resLike.status !== HttpStatusCode.Ok) throw Error
      setTweetsData(resLike.data.tweetsTopNew)
    }
    detaFetch()
  }, [])

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
    <TweetArea>
      {tweetsNewFilter?.map((tweet) => (
        <>
          <div className={style.large}>
            <TweetCard tweet={tweet} key={tweet.id} handleDelete={handleDelete} />
          </div>
          <div className={style.small}>
            <HomeTweetCard tweet={tweet} setOpen={setOpen} setShowTweets={setShowTweets} />
          </div>
        </>
      ))}
      <HomeTweetModal
        open={open}
        setOpen={setOpen}
        showTweets={showTweets}
        handleDelete={handleDelete}
      />
    </TweetArea>
  )
}
