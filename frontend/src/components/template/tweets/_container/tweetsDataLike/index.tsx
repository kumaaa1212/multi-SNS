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
  tweetsLike: TweetsType[]
  currentPage: number
}
export default function TweetLike(props: Props): JSX.Element {
  const { tweetsLike, albumserch, currentPage } = props

  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweetsLike)
  const [open, setOpen] = useState<boolean>(false)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweetsLike[0])
  const tweetsLikeFilter = tweetsData?.filter((tweet) => tweet.content.includes(albumserch))

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      const resLike = await apiClient.get('/article/all/tweets/order/like')

      if (resLike.status !== HttpStatusCode.Ok) throw Error
      setTweetsData(resLike.data.tweetsTopLike)
    }
    detaFetch()
  }, [])

  const handleDelete = async (tweet: TweetsType): Promise<void> => {
    await apiClient
      .delete('/post/likeTweet/delete', {
        params: {
          tweetId: tweet.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setTweetsData(res.data.sortedTweets)
      })
    setOpen(false)
  }

  return (
    <TweetArea>
      {tweetsLikeFilter?.slice(currentPage, currentPage + 6).map((tweet) => (
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
