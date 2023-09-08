import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookMarkIcon from '/public/svg/card_bookmark.svg'
import BookMarkedIcon from '/public/svg/card_bookmarked.svg'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/global'

interface Props {
  article: ArticlesType
  setCountBookmarks: any
}

const BookMarkBtn = (props: Props) => {
  const { article, setCountBookmarks } = props
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
        setCountBookmarks((prev: number) => prev - 1)
        setBookmark(false)
      } else {
        await apiClient.post('/post/album/bookmark/add', {
          postId: id,
          authorId: userId,
        })
        setCountBookmarks((prev: number) => prev + 1)
        setBookmark(true)
      }
    } catch {
      alert('情報の取得に失敗しました')
    }
  }

  return (
    <div className='bookmark_icon'>
      {bookmark ? (
        <BookMarkIcon onClick={handleBookMark} />
      ) : (
        <BookMarkedIcon onClick={handleBookMark} />
      )}
    </div>
  )
}

export default BookMarkBtn
