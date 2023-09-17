import React from 'react'
import { TweetsType } from 'types/global'
import TweetCard from 'components/parts/Card/Tweet'
import ArticleArea from 'components/widgets/Article'

interface Props {
  albumserch: string
  tweetsLike: TweetsType[]
}

export default function TweetLike(props: Props): JSX.Element {
  const { tweetsLike, albumserch } = props
  return (
    <ArticleArea>
      {tweetsLike?.map((tweet) => <TweetCard tweet={tweet} key={tweet.id} />)}
    </ArticleArea>
  )
}
