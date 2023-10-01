import { useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal/tweet'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import HomeTweetModal from 'components/widgets/Modal/Home/Tweet'
import HomeTemplate from 'components/widgets/home'
import stlye from './Tweet.module.scss'

interface Props {
  tweets: TweetsType[]
}

export default function TweetParts(props: Props): JSX.Element {
  const { tweets } = props

  const [showTweets, setShowTweets] = useState<TweetsType>(tweets[0])
  const [tweetsData, setTweetsData] = useState<TweetsType[]>(tweets)

  const [open, setOpen] = useState<boolean>(false)

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
  }

  return (
    <>
      <HomeTemplate
        titile='人気のTweet'
        showAll='すべてのTweetを見る'
        href='/tweet'
        footerShowAll='すべてのTweetを見る'
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
          open={open}
          setOpen={setOpen}
          showTweets={showTweets}
          handleDelete={handleDelete}
        />
      </HomeTemplate>
    </>
  )
}
