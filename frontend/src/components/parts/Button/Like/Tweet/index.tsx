import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { TweetsType } from 'types/internal/tweet'

interface Props {
  tweet: TweetsType
  setCountLikes: React.Dispatch<React.SetStateAction<number>>
  setLoading: (loading: boolean) => void
}

export default function TweetLikeBtn(props: Props): JSX.Element {
  const { tweet, setCountLikes, setLoading } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [likeBtn, setLikeBtn] = useState<boolean>(false)

  useEffect(() => {
    const fetchLike = async (): Promise<void> => {
      await apiClient
        .post('/post/tweet/like/check', {
          tweetId: tweet.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== 200) throw Error
          setLikeBtn(res.data.hasLiked)
        })
    }

    fetchLike()
  }, [setLoading, tweet, userId])

  const handleLike = async (): Promise<void> => {
    setLoading(true)
    if (likeBtn) {
      await apiClient
        .post('/post/tweet/like/delete', {
          tweetId: tweet.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== 200) throw Error
          setCountLikes((prev: number) => prev - 1)
          setLikeBtn(false)
          setLoading(false)
        })
    } else {
      await apiClient
        .post('/post/tweet/like/add', {
          tweetId: tweet.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== 200) throw Error
          setCountLikes((prev: number) => prev + 1)
          setLikeBtn(true)
          setLoading(false)
        })
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
          strokeWidth='3'
          stroke='#ff4500'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
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
          strokeWidth='1'
          stroke='#000000'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          onClick={handleLike}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
        </svg>
      )}
    </>
  )
}
