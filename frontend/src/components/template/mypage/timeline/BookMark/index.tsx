import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import style from '../TimeLine.module.scss'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
const MypageBooKMark = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const BookMarkFerch = async () => {
      try {
        const albumdata = await apiClient.get(`/post/album/bookmarked/${userId}`)
        setAlbumData(albumdata.data.bookmarkedPosts)
      } catch {
        alert('情報の取得に失敗しました')
      }
    }
    BookMarkFerch()
  }, [userId])

  return (
    <div className={style.album}>
      {albumData?.map((article, index) => (
        <ArticleCard key={index} article={article} setAlbumData={setAlbumData} />
      ))}
    </div>
  )
}

export default MypageBooKMark
