import { Grid } from '@mui/material'
import { TweetsType } from 'types/global'
import HomeTweetCard from 'components/parts/Card/Home/Tweet'
import HomeTemplate from 'components/widgets/home'

interface Props {
  tweets: TweetsType[]
}

const TweetParts = (props: Props): JSX.Element => {
  const { tweets } = props

  return (
    <>
      <HomeTemplate
        titile='Popular Tweets'
        showAll='Show All Tweets'
        href='/tweet'
        footerShowAll='Show All Tweets'
        color='gray'
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}>
          {tweets.map((tweet) => (
            <Grid item xs={1} sm={1} md={1} key={tweet.id}>
              <HomeTweetCard tweet={tweet} key={tweet.id} />
            </Grid>
          ))}
        </Grid>
      </HomeTemplate>
    </>
  )
}

export default TweetParts
