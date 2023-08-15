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
      try{
        const res = await apiClient.post('/post/album/bookmark/check', {
          postId: id,
          authorId: userId,
        })
        setBookmark(res.data.hasLiked)
      }
      catch{
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
        <BookmarkIcon onClick={handleBookMark} />
      ) : (
        <BookmarkBorderIcon onClick={handleBookMark} />
      )}
    </div>
  )
}

export default BookMarkBtn
