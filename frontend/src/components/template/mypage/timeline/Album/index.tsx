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
  console.log(userId)

  useEffect(() => {
    console.log('AAAA')
    console.log(userId)
    const myAlbum = async () => {
      try{
        const albumdata = await apiClient.get(`/post/album/myalbum/${userId}`)
        setAlbumData(albumdata.data.posts)
      }
      catch{
        alert('情報の取得に失敗しました')
      }
    }
    myAlbum()
  }, [userId])

  console.log(albumData)


  return (
    <div className={style.album}>
      {albumData &&
        albumData.map((article) => <ArticleCard article={article}  />)}
    </div>
  )
}

export default MypageAlbum
