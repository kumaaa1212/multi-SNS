import React, { useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal/album'
import ArticleCard from 'components/parts/Card/Album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import AlbumArea from 'components/widgets/Article/Album'
import style from '../index.module.scss'

interface Props {
  albumserch: string
  articlesNew: ArticlesType[]
  currentPage: number
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlbumNew(props: Props): JSX.Element {
  const { articlesNew, albumserch, currentPage, setLoading } = props

  const [albumNewData, setAlbumNewData] = useState<ArticlesType[]>(articlesNew)
  const articlesNewFilter = albumNewData?.filter(
    (article) => article.title.includes(albumserch) || article.content.includes(albumserch),
  )

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      setLoading(true)
      try {
        await apiClient.get('/article/all/content/order/new').then((res) => {
          if (res.status !== HttpStatusCode.Ok) throw Error
          setAlbumNewData(res.data.articleTopNew)
        })
      } catch {
        // toast
      } finally {
        setLoading(false)
      }
    }
    detaFetch()
  }, [setLoading])

  const handleDelete = async (album: ArticlesType): Promise<void> => {
    await apiClient
      .delete('/post/Newalbum/delete', {
        params: {
          postId: album.id,
        },
      })
      .then((res) => {
        if (res.status !== HttpStatusCode.Ok) throw Error
        setAlbumNewData(res.data.remainAlbums)
      })
  }

  return (
    <AlbumArea>
      {articlesNewFilter?.slice(currentPage, currentPage + 6).map((album) => (
        <div key={album.id}>
          <div className={style.large}>
            <ArticleCard album={album} handleDelete={handleDelete} setLoading={setLoading} />
          </div>
          <div className={style.small}>
            <HomeAlbumCard album={album} />
          </div>
        </div>
      ))}
    </AlbumArea>
  )
}
