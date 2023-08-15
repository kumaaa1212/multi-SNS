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
        <FavoriteIcon color={'error'} onClick={handleLike} />
      ) : (
        <FavoriteIcon onClick={handleLike} />
      )}
    </>
  )
}

export default LikeBtn
