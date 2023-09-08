import React, { useState } from 'react'
import style from './Tweet.module.scss'
import { Card, IconButton } from '@mui/material'
import Image from 'next/image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FollowBtn from '../../Button/Follow'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import TweetLikeBtn from '../../Button/Like/Tweet'
import DeleteIcon from '/public/svg/tweet_delete.svg'

const TweetCard = (props: any) => {
  const { tweet } = props
  const { userId } = useSelector((state: RootState) => state.user)
  const [moreover, setMoreover] = useState<boolean>(false)
  const [countLikes, setCountLikes] = useState<number>(tweet.likes.length)

  // const handleDelete = async () => {
  //   try {
  //     const updatedPost = await apiClient.delete(`/post/album/delete/${tweet.id}`)

  //     if (router.asPath === '/mypage') {
  //       setAlbumData(
  //         updatedPost.data.remainingPosts.filter(
  //           (album: ArticlesType) => album.authorId === userId,
  //         ),
  //       )
  //     }
  //     setMoreover(false)
  //   } catch {
  //     alert('削除に失敗しました')
  //   }
  // }

  return (
    <div className={style.tweet_card_continer}>
      <Card className={style.tweet_card}>
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
              <MoreVertIcon
                onClick={(): void => setMoreover(!moreover)}
                className={style.moreover_btn}
              />
            ) : (
              <FollowBtn article={tweet} className={style.follow_icon}>
                Follow
              </FollowBtn>
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
          <Image src={tweet.img} alt='' width={450} height={250} className={style.tweet_img} />
          <div className={style.scroll_area}>
            <span className={style.tweet_content}>{tweet.content}</span>
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

export default TweetCard
