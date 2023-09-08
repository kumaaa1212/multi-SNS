import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { Badge, Card } from '@mui/material'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import Icongenerate from 'utils/functions/Avater'
import style from './Bulletinboard.module.scss'
import CardLike from '/public/svg/board_like.svg'
import CardLiked from '/public/svg/board_liked.svg'
import CardMessage from '/public/svg/board_message.svg'
import { BoardType, LikeType } from 'types/global'

interface Props {
  children: React.ReactNode
  sideMessagrBar: boolean
  setSideMessagrBar: React.Dispatch<React.SetStateAction<boolean>>
  board: BoardType
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
}

const BulletinboardCard = (props: Props): JSX.Element => {
  const { children, sideMessagrBar, setSideMessagrBar, board, selectBoard, setSelectBoard } = props
  const { userId } = useSelector((state: RootState) => state.user)

  const [like, setLike] = useState<boolean>(
    board.likes?.map((like: LikeType) => like.authorId).includes(board.authorId),
  )

  const [likeCount, setLikeCount] = useState<number>(board.likes?.length)

  useEffect(() => {
    const fetchLike = async (): Promise<void> => {
      try {
        const res = await apiClient.get(
          `/board/board/like/check?boardId=${board.id}&authorId=${userId}`,
        )
        setLike(res.data.hasLiked)
      } catch {
        // alert('情報の取得に失敗しました')
      }
    }
    fetchLike()
  }, [board.id, userId])

  const handleSelectBoard = (): void => {
    if (!sideMessagrBar) {
      setSelectBoard(board)
      setSideMessagrBar(true)
    } else {
      setSelectBoard(undefined)
      setSideMessagrBar(false)
    }
  }

  const handleAddLike = async (): Promise<void> => {
    try {
      const likePost = await apiClient.post('/board/board/like/add', {
        boardId: board.id,
        authorId: userId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }

  const handleDelateLike = async (): Promise<void> => {
    try {
      const likePost = await apiClient.post('/board/board/like/delete', {
        boardId: board.id,
        authorId: userId,
      })
      setLikeCount(likePost.data.updatedBoard.likes.length)
      setLike(!like)
    } catch {
      alert('エラーが発生しました')
    }
  }

  const formatTimestamp = (timestamp: string): string => {
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
            src={board.authorAvatar ? Icongenerate(board?.authorAvatar) : '/noavater.jpg'}
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
          <Badge badgeContent={board.messages?.length} color='primary'>
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
