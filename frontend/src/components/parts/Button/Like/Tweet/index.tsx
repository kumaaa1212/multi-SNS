import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { TweetsType } from 'types/internal/tweet'

interface Props {
  tweet: TweetsType
  setCountLikes: React.Dispatch<React.SetStateAction<number>>
}

const TweetLikeBtn = (props: Props): JSX.Element => {
  const { userId } = useSelector((state: RootState) => state.user)

  const { tweet, setCountLikes } = props

  const [likeBtn, setLikeBtn] = useState<boolean>(false)

  useEffect(() => {
    const fetchLike = async (): Promise<void> => {
      try {
        const res = await apiClient.post('/post/tweet/like/check', {
          tweetId: tweet.id,
          authorId: userId,
        })
        setLikeBtn(res.data.hasLiked)
      } catch {
        alert('エラーが発生しました')
      }
    }

    fetchLike()
  }, [tweet, userId])

  const handleLike = async (): Promise<void> => {
    try {
      if (likeBtn) {
        await apiClient.post('/post/tweet/like/delete', {
          tweetId: tweet.id,
          authorId: userId,
        })
        setCountLikes((prev: number) => prev - 1)
        setLikeBtn(false)
      } else {
        await apiClient.post('/post/tweet/like/add', {
          tweetId: tweet.id,
          authorId: userId,
        })
        setCountLikes((prev: number) => prev + 1)
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

export default TweetLikeBtn
