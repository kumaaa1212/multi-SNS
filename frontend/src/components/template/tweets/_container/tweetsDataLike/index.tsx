import React from 'react'
import { TweetsType } from 'types/internal/tweet'
import TweetCard from 'components/parts/Card/Tweet'
import TweetArea from 'components/widgets/Article/Tweet'

interface Props {
  albumserch: string
  tweetsLike: TweetsType[]
}

export default function TweetLike(props: Props): JSX.Element {
  const { tweetsLike, albumserch } = props

  const tweetsLikeFilter = tweetsLike.filter((tweet) => tweet.content.includes(albumserch))

  return (
    <TweetArea>
      {tweetsLikeFilter?.map((tweet) => <TweetCard tweet={tweet} key={tweet.id} />)}
    </TweetArea>
  )
}
