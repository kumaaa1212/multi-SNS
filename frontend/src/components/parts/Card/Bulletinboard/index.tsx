import { Badge, Card } from '@mui/material'
import style from './Bulletinboard.module.scss'
import Image from 'next/image'
import noavater from 'public/noavater.jpg'
import { useEffect, useState } from 'react'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import Icongenerate from '@/utils/functions/Avater'
import CardLike from '/public/svg/board_like.svg'
import CardLiked from '/public/svg/board_liked.svg'
import CardMessage from '/public/svg/board_message.svg'
const BulletinboardCard = (props: any) => {
  const { children, sideMessagrBar, setSideMessagrBar, board, selectBoard, setSelectBoard } = props
  const { userId } = useSelector((state: RootState) => state.user)

  const [like, setLike] = useState<boolean>(
    board.likes.map((like: any) => like.authorId).includes(board.authorId),
  )

  const [likeCount, setLikeCount] = useState<number>(board.likes.length)

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await apiClient.post('/post/board/like/check', {
          boardId: board.id,
          authorId: userId,
        })
        setLike(res.data.hasLiked)
      } catch {
        alert('情報の取得に失敗しました')
      }
    }

    fetchLike()
  }, [])

  const handleSelectBoard = () => {
    if (!sideMessagrBar) {
      setSelectBoard(board)
      setSideMessagrBar(true)
    } else {
      setSelectBoard()
      setSideMessagrBar(false)
    }
  }

  const handleAddLike = async () => {
    try {
      const likePost = await apiClient.post('/post/board/like/add', {
        boardId: board.id,
        authorId: userId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      console.log(likePost.data.updatedBoard)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }
  const handleDelateLike = async () => {
    try {
      const likePost = await apiClient.post('/post/board/like/delete', {
        boardId: board.id,
        authorId: userId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${month}-${day} ${hours}:${minutes}`
  }

  return (
    <Card className={`${board.id === selectBoard?.id ? `${style.click}` : ''}`}>
      <div className={style.bulletin_board_Card}>
        <div className={style.timeline_user}>
          <Image
            src={board.authorAvatar ? Icongenerate(board?.authorAvatar) : noavater}
            alt={''}
            width={40}
            height={40}
            className={style.profile_img}
          />
          <div className={style.card_info}>
            <div className={style.user_detail_info}>
              <span className={style.user_name}>{board.authorName}</span>
              <span className={style.publish_time}>{formatTimestamp(board.createdAt)}</span>
            </div>
            <div className={style.card_contents}>{children}</div>
          </div>
        </div>
        <div className={style.option_btn}>
          <Badge badgeContent={board.messages.length} color='primary'>
            <CardMessage
              onClick={handleSelectBoard}
              stroke={board.id === selectBoard?.id ? '#ffffff' : '#000000'}
            />
          </Badge>
          <Badge badgeContent={likeCount} color='error' className={style.like_btn}>
            {like ? (
              <CardLike onClick={handleDelateLike} />
            ) : (
              <CardLiked
                onClick={handleAddLike}
                stroke={board.id === selectBoard?.id ? '#ffffff' : '#000000'}
              />
            )}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default BulletinboardCard
