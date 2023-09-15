import { useState } from 'react'
import { Grid } from '@mui/material'
import { TweetsType } from 'types/global'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import HomeTweetModal from 'components/widgets/Modal/Home/Tweet'
import HomeTemplate from 'components/widgets/home'

interface Props {
  tweets: TweetsType[]
}

const TweetParts = (props: Props): JSX.Element => {
  const { tweets } = props
  const [showTweets, setShowTweets] = useState<TweetsType>(tweets[0])
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <HomeTemplate
        titile='Popular Tweets'
        showAll='Show All Tweets'
        href='/tweet'
        footerShowAll='Show All Tweets'
        color='gray'
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
          {tweets.map((tweet) => (
            <Grid item xs={1} sm={1} md={1} key={tweet.id}>
              <HomeTweetCard
                tweet={tweet}
                key={tweet.id}
                setShowTweets={setShowTweets}
                setOpen={setOpen}
              />
            </Grid>
          ))}
        </Grid>
        <HomeTweetModal open={open} setOpen={setOpen} showTweets={showTweets} />
      </HomeTemplate>
    </>
  )
}

export default TweetParts
