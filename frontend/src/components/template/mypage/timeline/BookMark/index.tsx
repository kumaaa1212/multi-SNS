import React, { useEffect } from 'react'
import style from '../TimeLine.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
import { ArticlesType } from '@/types/global'
import apiClient from '@/libs/apiClient'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
const MypageBooKMark = () => {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumData, setAlbumData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    myAlbum()
  }, [])

  const myAlbum = async () => {
    const albumdata = await apiClient.get(`/post/album/bookmarked/${userId}`)
    setAlbumData(albumdata.data.bookmarkedPosts)
    console.log(albumdata.data)
  }

  return (
    <div className={style.album}>
      {albumData?.map((article) => <ArticleCard article={article} setAlbumData={setAlbumData} />)}
    </div>
  )
}

export default MypageBooKMark
