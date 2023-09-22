import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookMarkIcon from '/public/svg/card_bookmark.svg'
import BookMarkedIcon from '/public/svg/card_bookmarked.svg'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'

interface Props {
  album: ArticlesType
  setCountBookmarks: React.Dispatch<React.SetStateAction<number>>
}

const BookMarkBtn = (props: Props): JSX.Element => {
  const { album, setCountBookmarks } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [bookmark, setBookmark] = useState<boolean>(false)

  useEffect(() => {
    const fetchBookmark = async (): Promise<void> => {
      const [likeCheckRes, likeCountRes] = await Promise.all([
        apiClient.get('/post/album/bookmark/check', {
          params: {
            postId: album.id,
            authorId: userId,
          },
        }),
        apiClient.get('/post/album/bookmark/get', {
          params: {
            postId: album.id,
            authorId: userId,
          },
        }),
      ])
      if (likeCheckRes.status !== HttpStatusCode.Ok || likeCountRes.status !== HttpStatusCode.Ok)
        throw Error
      setBookmark(likeCheckRes.data.hasLiked)
      setCountBookmarks(likeCountRes.data.bookmarkCount)
    }
    fetchBookmark()
  }, [album, setCountBookmarks, userId])

  const handleBookMark = async (): Promise<void> => {
    if (bookmark) {
      const res = await apiClient
        .delete('/post/album/bookmark/delete', {
          data: {
            postId: album.id,
            authorId: userId,
          },
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setCountBookmarks(res.data.relatedPost.bookmarks.length)
          setBookmark(false)
        })
    } else {
      const res = await apiClient
        .post('/post/album/bookmark/add', {
          postId: album.id,
          authorId: userId,
        })
        .then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setCountBookmarks(res.data.updatedPost.bookmarks.length)
          setBookmark(true)
        })
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
