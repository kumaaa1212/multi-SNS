import React, { use, useEffect, useState } from 'react'
import apiClient from '@/libs/apiClient'
import FavoriteIcon from '@mui/icons-material/Favorite'
const LikeBtn = (props: any) => {
  const { article } = props
  const { authorId, id } = article

  const [likeBtn, setLikeBtn] = useState<boolean>(false)

  useEffect(() => {
    const fetchLike = async () => {
      const res = await apiClient.post('/post/album/like/check', {
        postId: id,
        authorId,
      })
      setLikeBtn(res.data.hasLiked)
    }

    fetchLike()
  }, [])

  const handleLike = async () => {
    if (likeBtn) {
      await apiClient.post('/post/album/like/delete', {
        postId: id,
        authorId,
      })
    } else {
      await apiClient.post('/post/album/like/add', {
        postId: id,
        authorId,
      })
    }
    setLikeBtn(!likeBtn)
  }

  const LikeBtnComponent = (): JSX.Element => {
    return <FavoriteIcon color={likeBtn ? 'error' : 'inherit'} onClick={handleLike} />
  }

  return <>{LikeBtnComponent()}</>
}

export default LikeBtn
