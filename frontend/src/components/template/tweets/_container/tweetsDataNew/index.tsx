import React from 'react'
import { TweetsType } from 'types/global'
import TweetCard from 'components/parts/Card/Tweet'
import ArticleArea from 'components/widgets/Article'

interface Props {
  albumserch: string
  tweetsNew: TweetsType[]
}

export default function TweetNew(props: Props): JSX.Element {
  const { tweetsNew, albumserch } = props
  return (
    <ArticleArea>
      {tweetsNew?.map((tweet) => <TweetCard tweet={tweet} key={tweet.id} />)}
    </ArticleArea>
  )
}
