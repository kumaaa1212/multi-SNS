import { useEffect, useState } from 'react'
import { formatTimestamp } from 'utils/functions/Time'
import style from './Tweet.module.scss'
import { Card, IconButton } from '@mui/material'
import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FollowBtn from '../../Button/Follow'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import TweetLikeBtn from '../../Button/Like/Tweet'
import { TweetsType } from 'types/global'
import DeleteIcon from '/public/svg/tweet_delete.svg'

interface Props {
  tweet: TweetsType
}

export default function TweetCard(props: Props): JSX.Element {
  const { tweet } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [moreover, setMoreover] = useState<boolean>(false)
  const [countLikes, setCountLikes] = useState<number>(0)

  useEffect(() => {
    if (tweet.likes) {
      setCountLikes(tweet.likes.length)
    }
  }, [tweet.likes])

  return (
    <div className={style.tweet_card_continer}>
      <Card className={style.tweet_card}>
        <div className={style.tweet_header}>
          <Image
            src={tweet.authorAvatar}
            alt='tweetのicon'
            width={40}
            height={40}
            className={style.profile_img}
          />
          <div className={style.tweet_header_details}>
            <div>
              <p>{tweet.authorName}</p>
              <p>{formatTimestamp(tweet.createdAt)}</p>
            </div>
            {tweet.authorId === userId ? (
              <MoreVertIcon
                onClick={(): void => setMoreover(!moreover)}
                className={style.moreover_btn}
              />
            ) : (
              <FollowBtn posts={tweet} content='follow' />
            )}
            {moreover && (
              <div className={style.moreover_area}>
                <p>削除</p>
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
        <div className={style.tweet_contents}>
          <Image
            src={tweet.img.length === 0 ? tweet.img : '/thumbnail.png'}
            alt='tweetのmain画像'
            width={450}
            height={250}
            className={style.tweet_img}
          />
          <div className={style.scroll_area}>
            <div className={style.tweet_content}>{tweet.content}</div>
          </div>
        </div>
        <div className={style.footer}>
          <IconButton aria-label='add to favorites'>
            <TweetLikeBtn article={tweet} setCountLikes={setCountLikes} />
            <span>{countLikes}</span>
          </IconButton>
        </div>
      </Card>
    </div>
  )
}
