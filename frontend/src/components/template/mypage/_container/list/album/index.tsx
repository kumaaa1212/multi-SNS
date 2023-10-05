import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { RootState } from 'store/store'
import { ArticlesType } from 'types/internal/album'
import ArticleCard from 'components/parts/Card/Album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import style from '../index.module.scss'

interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MypageAlbum(props: Props): JSX.Element {
  const { setLoading } = props

  const { userId } = useSelector((state: RootState) => state.user)
  const [albumsData, setAlbumsData] = React.useState<ArticlesType[]>([])

  useEffect(() => {
    const myAlbum = async (): Promise<void> => {
      setLoading(true)
      await apiClient.get(`/post/album/myalbum/${userId}`).then((res) => {
        if (res.status !== 200) throw Error
        setAlbumsData(res.data.posts)
        setLoading(false)
      })
    }
    myAlbum()
  }, [setLoading, userId])

  const handleDelete = async (album: ArticlesType): Promise<void> => {
    await apiClient
      .delete('/post/Newalbum/delete', {
        params: {
          postId: album.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setAlbumsData(res.data.remainAlbums)
      })
  }

  return (
    <div className={style.album}>
      <div className={style.wide}>
        <div className={style.contents}>
          {albumsData &&
            albumsData.map((album, index) => (
              <ArticleCard
                key={index}
                album={album}
                handleDelete={handleDelete}
                setLoading={setLoading}
              />
            ))}
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
