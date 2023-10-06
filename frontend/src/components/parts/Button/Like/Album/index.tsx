import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import LikeBtn from '/public/svg/album_likeBtn.svg'
import LikedBtn from '/public/svg/album_likedBtn.svg'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'

interface Props {
  album: ArticlesType
  setCountLikes: React.Dispatch<React.SetStateAction<number>>
  toastFunc: (content: string, isError: boolean) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlbumLikeBtn(props: Props): JSX.Element {
  const { album, setCountLikes, toastFunc, setLoading } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [likeBtn, setLikeBtn] = useState<boolean>(false)

  useEffect(() => {
    if (!userId) return
    const fetchData = async (): Promise<void> => {
      await apiClient
        .get('/post/album/like/check', {
          params: {
            postId: album.id,
            authorId: userId,
          },
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setLikeBtn(res.data.hasLiked)
        })
    }
    fetchData()
  }, [album, userId])

  const handleLike = async (): Promise<void> => {
    if (!userId) return toastFunc('ログインしてください', true)
    setLoading(true)
    if (likeBtn) {
      await apiClient
        .post('/post/album/like/delete', {
          postId: album.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setCountLikes(res.data.updatedPost.likes.length)
          setLikeBtn(false)
        })
    } else {
      await apiClient
        .post('/post/album/like/add', {
          postId: album.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setLikeBtn(true)
          setCountLikes(res.data.updatedPost.likes.length)
        })
    }
    setLoading(false)
  }

  return <>{likeBtn ? <LikedBtn onClick={handleLike} /> : <LikeBtn onClick={handleLike} />}</>
}
