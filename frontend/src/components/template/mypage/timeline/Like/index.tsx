import React, { useEffect } from 'react'
import style from '../TimeLine.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import { ArticlesType } from '@/types/global'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
const MypageLikes = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    myAlbum()
  }, [])

  const myAlbum = async () => {
    const albumdata = await apiClient.get(`/post/album/like/${userId}`)
    setAlbumData(albumdata.data.likedPosts)
    console.log(albumdata.data)
    console.log(albumdata.data.likedPosts)
  }

  return (
    <div className={style.album}>
      {albumData?.map((article) => (
        <ArticleCard article={article} setAlbumData={setAlbumData} />
      ))}
    </div>
  )
}

export default MypageLikes
