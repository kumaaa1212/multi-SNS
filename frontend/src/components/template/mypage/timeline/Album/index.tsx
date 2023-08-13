import React, { useEffect } from 'react'
import style from '../TimeLine.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import { ArticlesType } from '@/types/global'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
const MypageAlbum = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    myAlbum()
  }, [])

  const myAlbum = async () => {
    const albumdata = await apiClient.get(`/post/all/album/${userId}`)
    setAlbumData(albumdata.data.posts)
  }

  return (
    <div className={style.album}>
      {albumData.map((article) => (
        <ArticleCard article={article} setAlbumData={setAlbumData} />
      ))}
    </div>
  )
}

export default MypageAlbum
