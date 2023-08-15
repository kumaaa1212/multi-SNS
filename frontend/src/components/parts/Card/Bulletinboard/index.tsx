import { Badge } from '@mui/material'
import style from './Bulletinboard.module.scss'
import Image from 'next/image'
import noavater from 'public/noavater.jpg'
import { useState } from 'react'
import apiClient from '@/libs/apiClient'
const BulletinboardCard = (props: any) => {
  const { children, sideMessagrBar, setSideMessagrBar, board, setSelectBoard } = props

  const [like, setLike] = useState<boolean>(
    board.likes.map((like: any) => like.authorId).includes(board.authorId),
  )

  const [likeCount, setLikeCount] = useState<number>(board.likes.length)

  const handleSelectBoard = () => {
    setSelectBoard(board)
    setSideMessagrBar(!sideMessagrBar)
  }

  const handleAddLike = async () => {
    try {
      const likePost = await apiClient.post('/post/board/like/add', {
        boardId: board.id,
        authorId: board.authorId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }
  const handleDelateLike = async () => {
    try {
      const likePost = await apiClient.post('/post/board/like/delete', {
        boardId: board.id,
        authorId: board.authorId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }

  return (
    <div className={style.bulletin_board_Card}>
      <div className={style.timeline_user}>
        <Image
          src={board.authorAvatar ? board?.authorAvatar : noavater}
          alt={''}
          width={40}
          height={40}
          className={style.profile_img}
        />
        <div className={style.card_info}>
          <div className={style.user_detail_info}>
            <span className={style.user_name}>{board.authorName}</span>
            <span className={style.publish_time}>{board.createdAt}</span>
          </div>
          <div className={style.card_contents}>{children}</div>
        </div>
      </div>
      <div className={style.option_btn}>
        <Badge badgeContent={board.messages.length} color='primary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='35'
            height='35'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#000000'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
            onClick={handleSelectBoard}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M8 9h8' />
            <path d='M8 13h6' />
            <path d='M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z' />
          </svg>
        </Badge>
        <Badge badgeContent={likeCount} color='error' className={style.like_btn}>
          {like ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='35'
              height='35'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='#ff0000'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              onClick={handleDelateLike}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='35'
              height='35'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='#000000'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              onClick={handleAddLike}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </svg>
          )}
        </Badge>
      </div>
    </div>
  )
}

export default BulletinboardCard
