import { useState } from 'react'
import { HttpStatusCode } from 'axios'
import { useToast } from 'components/hooks/useToast'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal/tweet'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import ToastBase from 'components/parts/Toast'
import HomeTweetModal from 'components/widgets/Modal/Tweet/Home'
import HomeTemplate from 'components/widgets/home'
import stlye from './Tweet.module.scss'

interface Props {
  tweets: TweetsType[]
}

export default function TweetParts(props: Props): JSX.Element {
  const { tweets } = props

  const [open, setOpen] = useState<boolean>(false)
  const [showTweets, setShowTweets] = useState<TweetsType>(tweets[0])
  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweets)
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const { toastContent, isError, isToast, toastFunc } = useToast()

  const handleDelete = async (tweet: TweetsType): Promise<void> => {
    setModalLoading(true)
    try {
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
    } catch {
      toastFunc('削除に失敗しました', true)
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <>
      <HomeTemplate
        titile='人気のTweet'
        showAll='全てのTweetを見る'
        href='/tweet'
        footerShowAll='全てのTweetを見る'
        color='gray'
      >
        <div className={stlye.main}>
          {tweetsData.map((album) => (
            <HomeTweetCard
              tweet={album}
              key={album.id}
              setShowTweets={setShowTweets}
              setOpen={setOpen}
            />
          ))}
        </div>
        <HomeTweetModal
          loading={modalLoading}
          setLoading={setModalLoading}
          open={open}
          setOpen={setOpen}
          showTweets={showTweets}
          handleDelete={handleDelete}
        />
        <ToastBase isError={isError} active={isToast} content={toastContent} />
      </HomeTemplate>
    </>
  )
}
