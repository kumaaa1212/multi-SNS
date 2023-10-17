import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Badge, Card } from '@mui/material'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { jLeagueTeams } from 'utils/TeamData'
import Icongenerate from 'utils/functions/Avater'
import { formatTimestamp } from 'utils/functions/Time'
import { BoardRoomType, BoardType, BoradLikeType } from 'types/internal/board'
import Loading from 'components/layout/Loading'
import DeleteButton from 'components/parts/Button/Delete'
import style from './Board.module.scss'
import CardLike from '/public/svg/board_like.svg'
import CardLiked from '/public/svg/board_liked.svg'
import CardMessage from '/public/svg/board_message.svg'

interface Props {
  children: React.ReactNode
  sideMessagrBar: boolean
  setSideMessagrBar: React.Dispatch<React.SetStateAction<boolean>>
  board: BoardType
  selectBoard: BoardType | undefined
  setSelectBoard: React.Dispatch<React.SetStateAction<BoardType | undefined>>
  setBoardRooms: React.Dispatch<React.SetStateAction<BoardRoomType>>
  toastFunc: (content: string, isError: boolean) => void
}

export default function BulletinboardCard(props: Props): JSX.Element {
  const { children, sideMessagrBar, setSideMessagrBar, board } = props
  const { selectBoard, setSelectBoard, setBoardRooms, toastFunc } = props

  const router = useRouter()
  const { userId, team } = useSelector((state: RootState) => state.user)
  const [likeCount, setLikeCount] = useState<number>(board.likes?.length)
  const [loading, setLoading] = useState<boolean>(false)
  const [like, setLike] = useState<boolean>(
    board.likes?.map((like: BoradLikeType) => like.authorId).includes(board.authorId),
  )

  useEffect(() => {
    const fetchLike = async (): Promise<void> => {
      setLoading(true)
      await apiClient
        .get(`/board/board/like/check`, {
          params: {
            boardId: board.id,
            authorId: userId,
          },
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) {
            toastFunc('エラーが発生しました', true)
          } else {
            setLike(res.data.hasLiked)
            setLoading(false)
          }
        })
    }
    fetchLike()
  }, [board, toastFunc, userId])

  const dataFetch = async (): Promise<void> => {
    await apiClient.get(`/board/boardRooms/${router.query.team}`).then((res) => {
      if (res.status !== HttpStatusCode.Ok) {
        toastFunc('掲示板の更新に失敗しました', true)
      }
      setBoardRooms(res.data.boardRoom)
    })
  }

  const handleSelectBoard = (): void => {
    if (!sideMessagrBar) {
      setSelectBoard(board)
      setSideMessagrBar(true)
    } else {
      setSelectBoard(undefined)
      setSideMessagrBar(false)
      dataFetch()
    }
  }

  const handleAddLike = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .post('/board/board/like/add', {
        boardId: board.id,
        authorId: userId,
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          toastFunc('エラーが発生しました', true)
        } else {
          setLikeCount(res.data.updatedBoard.likes.length)
          setLike(!like)
          setLoading(false)
        }
      })
  }

  const handleDelateLike = async (): Promise<void> => {
    setLoading(true)
    await apiClient
      .post('/board/board/like/delete', {
        boardId: board.id,
        authorId: userId,
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          toastFunc('エラーが発生しました', true)
        } else {
          setLikeCount(res.data.updatedBoard.likes.length)
          setLike(!like)
          setLoading(false)
        }
      })
  }

  const handleClick = async (): Promise<void> => {
    setLoading(true)
    const filterTeam = jLeagueTeams.filter((item) => item.name === team)
    await apiClient
      .delete(`/board/board/${board.id}/delete`, {
        params: {
          team: filterTeam[0]?.label,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) {
          toastFunc('削除に失敗しました', true)
        } else {
          setBoardRooms(res.data.boardRoom)
          setSideMessagrBar(false)
          setLoading(false)
        }
      })
  }

  return (
    <Card className={`${board.id === selectBoard?.id ? `${style.click_board}` : ''}`}>
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
              {board.authorId === userId && (
                <DeleteButton
                  content='削除'
                  board
                  onClick={handleClick}
                  inversion={sideMessagrBar}
                />
              )}
            </div>
            <div className={style.card_contents}>{children}</div>
          </div>
        </div>
        <div className={style.option_btn}>
          <Badge
            badgeContent={board.messages?.length}
            color='primary'
            className={style.message_btn}
            onClick={handleSelectBoard}
          >
            <CardMessage stroke={board.id === selectBoard?.id ? '#ffffff' : '#000000'} />
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
      {loading && <Loading />}
    </Card>
  )
}
