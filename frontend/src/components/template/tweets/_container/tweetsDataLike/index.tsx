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
  tweetsLike: TweetsType[]
  currentPage: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  toastFunc: (content: string, isError: boolean) => void
}
export default function TweetLike(props: Props): JSX.Element {
  const { tweetsLike, albumserch, currentPage, setLoading, toastFunc } = props

  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweetsLike)
  const [open, setOpen] = useState<boolean>(false)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweetsLike[0])
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const tweetsLikeFilter = tweetsData?.filter((tweet) => tweet.content.includes(albumserch))

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      setLoading(true)
      try {
        await apiClient.get('/article/all/tweets/order/like').then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setTweetsData(res.data.tweetsTopLike)
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
    setModalLoading(true)
    try {
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
    } catch {
      toastFunc('削除に失敗しました', true)
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <TweetArea>
      {tweetsLikeFilter?.slice(currentPage, currentPage + 6).map((tweet) => (
        <>
          <div className={style.large} key={tweet.id}>
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
        loading={modalLoading}
        setLoading={setModalLoading}
        open={open}
        setOpen={setOpen}
        showTweets={showTweets}
        handleDelete={handleDelete}
      />
    </TweetArea>
  )
}
