import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Card, IconButton } from '@mui/material'
import { RootState } from 'store/store'
import { formatTimestamp } from 'utils/functions/Time'
import { TweetsType } from 'types/internal/tweet'
import DeleteIcon from '/public/svg/tweet_delete.svg'
import FollowButton from 'components/parts/Button/Follow'
import TweetLikeBtn from 'components/parts/Button/Like/Tweet'
import style from './Small.module.scss'

interface Props {
  tweet: TweetsType
  handleDelete: (album: TweetsType) => void
}

export default function SmallTweetCard(props: Props): JSX.Element {
  const { tweet, handleDelete } = props

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
              <FollowButton posts={tweet} content='follow' />
            )}
            {moreover && (
              <div className={style.moreover_area} onClick={(): void => handleDelete(tweet)}>
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
            priority
            width={400}
            height={250}
            className={style.tweet_img_md}
          />
          <Image
            src={tweet.img.length === 0 ? tweet.img : '/thumbnail.png'}
            alt='tweetのmain画像'
            priority
            width={200}
            height={150}
            className={style.tweet_img_small}
          />
          <div className={style.scroll_area}>
            <div className={style.tweet_content}>{tweet.content}</div>
          </div>
        </div>
        <div className={style.footer}>
          <IconButton aria-label='add to favorites'>
            <TweetLikeBtn tweet={tweet} setCountLikes={setCountLikes} />
            <span>{countLikes}</span>
          </IconButton>
        </div>
      </Card>
    </div>
  )
}
