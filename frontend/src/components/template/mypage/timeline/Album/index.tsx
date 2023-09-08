import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import style from '../TimeLine.module.scss'
import ArticleCard from 'components/parts/Card/Articles'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/global'
const MypageAlbum = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const myAlbum = async () => {
      try {
        const albumdata = await apiClient.get(`/post/album/myalbum/${userId}`)
        setAlbumData(albumdata.data.posts)
      } catch {
        alert('情報の取得に失敗しました')
      }
    }
    myAlbum()
  }, [userId])

  return (
    <div className={style.album}>
      {albumData &&
        albumData.map((article, index) => <ArticleCard key={index} article={article} />)}
    </div>
  )
}

export default MypageAlbum
