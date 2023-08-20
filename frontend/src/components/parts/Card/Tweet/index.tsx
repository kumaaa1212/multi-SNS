import React from 'react'
import style from './Tweet.module.scss'
import { Card } from '@mui/material'
import Image from 'next/image'
import FollowBtn from '../../Button/Follow'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const TweetCard = (props: any) => {
  const { tweet } = props
  const { userId } = useSelector((state: RootState) => state.user)
  console.log(tweet)

  return (
    <Card className={style.tweet_card}>
      <div className={style.tweet}>
        <div className={style.tweet_header}>
          <Image
            src={tweet.authorAvatar}
            alt=''
            width={40}
            height={40}
            className={style.profile_img}
          />
          <div className={style.tweet_header_details}>
            <div>
              <p>{tweet.authorName}</p>
              <p>{tweet.createdAt}</p>
            </div>
            {tweet.authorId === userId ? (
              <p></p>
            ) : (
              <FollowBtn article={tweet} className={style.follow_icon}>
                Follow
              </FollowBtn>
            )}
          </div>
        </div>
        <div className={style.tweet_contents}>
          <Image src={tweet.img} alt='' width={450} height={250} className={style.tweet_img} />
          <div className={style.tweet_content}>{tweet.content}</div>
        </div>
      </div>
    </Card>
  )
}

export default TweetCard
