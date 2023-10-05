import React, { useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal/tweet'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import TweetCard from 'components/parts/Card/Tweet'
import TweetArea from 'components/widgets/Article/Tweet'
import HomeTweetModal from 'components/widgets/Modal/Tweet/Home'
import style from '../index.module.scss'

interface Props {
  albumserch: string
  tweetsNew: TweetsType[]
  currentPage: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  toastFunc: (content: string, isError: boolean) => void
}

export default function TweetNew(props: Props): JSX.Element {
  const { tweetsNew, albumserch, currentPage, setLoading, toastFunc } = props

  const [open, setOpen] = useState(false)
  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweetsNew)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweetsNew[0])
  const tweetsNewFilter = tweetsData?.filter((tweet) => tweet.content.includes(albumserch))

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      setLoading(true)
      try {
        await apiClient.get('/article/all/tweets/order/new').then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setTweetsData(res.data.tweetsTopNew)
        })
      } catch {
        toastFunc('データの取得に失敗しました', true)
      } finally {
        setLoading(false)
      }
    }
    detaFetch()
  }, [setLoading, toastFunc])

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
      {tweetsNewFilter?.slice(currentPage, currentPage + 6).map((tweet) => (
        <>
          <div className={style.large}>
            <TweetCard
              tweet={tweet}
              key={tweet.id}
              handleDelete={handleDelete}
              setLoading={setLoading}
            />
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
