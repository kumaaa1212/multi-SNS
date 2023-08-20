import { useEffect, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { ArticlesType } from '@/types/global'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import apiClient from '@/libs/apiClient'

interface Props {
  article: ArticlesType
}

const BookMarkBtn = (props: Props) => {
  const { article } = props
  const { id } = article

  const { userId } = useSelector((state: RootState) => state.user)

  const [bookmark, setBookmark] = useState<boolean>(false)

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const res = await apiClient.post('/post/album/bookmark/check', {
          postId: id,
          authorId: userId,
        })
        setBookmark(res.data.hasLiked)
      } catch {
        alert('情報の取得に失敗しました')
      }
    }

    fetchLike()
  }, [])

  const handleBookMark = async () => {
    try {
      if (bookmark) {
        await apiClient.post('/post/album/bookmark/delete', {
          postId: id,
          authorId: userId,
        })
        setBookmark(false)
      } else {
        await apiClient.post('/post/album/bookmark/add', {
          postId: id,
          authorId: userId,
        })
        setBookmark(true)
      }
    } catch {
      alert('情報の取得に失敗しました')
    }
  }

  return (
    <div className='bookmark_icon'>
      {bookmark ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          viewBox='0 0 24 24'
          stroke-width='3'
          stroke='#000000'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
          onClick={handleBookMark}
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          onClick={handleBookMark}
          width='40'
          height='40'
          viewBox='0 0 24 24'
          stroke-width='1'
          stroke='#000000'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2' />
        </svg>
      )}
    </div>
  )
}

export default BookMarkBtn
