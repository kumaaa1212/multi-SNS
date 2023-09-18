import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Album'
import style from '../index.module.scss'

export default function MypageAlbum(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumsData, setAlbumsData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const myAlbum = async (): Promise<void> => {
      await apiClient.get(`/post/album/myalbum/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setAlbumsData(res.data.posts)
      })
    }
    myAlbum()
  }, [userId])

  return (
    <div className={style.album}>
      {albumsData && albumsData.map((album, index) => <ArticleCard key={index} album={album} />)}
    </div>
  )
}
