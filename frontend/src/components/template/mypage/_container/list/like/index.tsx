import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'
import ArticleCard from 'components/parts/Card/Album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import style from '../index.module.scss'

export default function MypageLikes(): JSX.Element {
  const { userId } = useSelector((state: RootState) => state.user)
  const [albumsData, setAlbumsData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const myAlbum = async (): Promise<void> => {
      await apiClient.get(`/post/album/like/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setAlbumsData(res.data.likedPosts)
      })
    }
    myAlbum()
  }, [userId])

  return (
    <div className={style.album}>
      <div className={style.wide}>
        <div className={style.contents}>
          {albumsData &&
            albumsData.map((album, index) => <ArticleCard key={index} album={album} />)}
        </div>
      </div>
      <div className={style.small}>
        <div className={style.contents}>
          {albumsData &&
            albumsData.map((album, index) => <HomeAlbumCard key={index} album={album} />)}
        </div>
      </div>
    </div>
  )
}
