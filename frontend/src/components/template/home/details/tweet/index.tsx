import { useState } from 'react'
import { Grid } from '@mui/material'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal/tweet'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import HomeTweetModal from 'components/widgets/Modal/Home/Tweet'
import HomeTemplate from 'components/widgets/home'

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
        showAll='Show All Tweets'
        href='/tweet'
        footerShowAll='Show All Tweets'
        color='gray'
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
          {tweetsData?.map((tweet) => (
            <Grid item xs={1} sm={1} md={1} key={tweet.id} className='aaaaa'>
              <HomeTweetCard
                tweet={tweet}
                key={tweet.id}
                setShowTweets={setShowTweets}
                setOpen={setOpen}
              />
            </Grid>
          ))}
        </Grid>
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
