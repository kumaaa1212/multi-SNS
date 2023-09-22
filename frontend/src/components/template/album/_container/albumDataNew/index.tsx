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
}

export default function AlbumNew(props: Props): JSX.Element {
  const { articlesNew, albumserch } = props

  const [albumNewData, setAlbumNewData] = useState<ArticlesType[]>(articlesNew)
  const articlesNewFilter = albumNewData?.filter(
    (article) => article.title.includes(albumserch) || article.content.includes(albumserch),
  )

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      const resLike = await apiClient.get('/article/all/content/order/new')
      if (resLike.status !== HttpStatusCode.Ok) throw Error
      setAlbumNewData(resLike.data.articleTopNew)
    }
    detaFetch()
  }, [])

  return (
    <AlbumArea>
      {articlesNewFilter?.map((album) => (
        <div key={album.id}>
          <div className={style.large}>
            <ArticleCard album={album} />
          </div>
          <div className={style.small}>
            <HomeAlbumCard album={album} />
          </div>
        </div>
      ))}
    </AlbumArea>
  )
}
