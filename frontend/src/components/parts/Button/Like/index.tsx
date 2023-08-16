import React, { use, useEffect, useMemo, useState } from 'react'
import apiClient from '@/libs/apiClient'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
const LikeBtn = (props: any) => {
  const { userId } = useSelector((state: RootState) => state.user)

  const { article } = props
  const { id } = article

  const [likeBtn, setLikeBtn] = useState<boolean>(false)

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await apiClient.post('/post/album/like/check', {
          postId: id,
          authorId: userId,
        })
        setLikeBtn(res.data.hasLiked)
      } catch {
        alert('情報の取得に失敗しました')
      }
    }

    fetchLike()
  }, [])

  const handleLike = async () => {
    try {
      if (likeBtn) {
        await apiClient.post('/post/album/like/delete', {
          postId: id,
          authorId: userId,
        })
        setLikeBtn(false)
      } else {
        await apiClient.post('/post/album/like/add', {
          postId: id,
          authorId: userId,
        })
        setLikeBtn(true)
      }
    } catch {
      alert('エラーが発生しました')
    }
  }

  return (
    <>
      {likeBtn ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          stroke-width='3'
          stroke='#ff4500'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={handleLike}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          stroke-width='1'
          stroke='#000000'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={handleLike}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        </svg>
      )}
    </>
  )
}

export default LikeBtn
