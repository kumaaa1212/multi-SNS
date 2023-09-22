import { useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal/album'
import ArticleCard from 'components/parts/Card/Album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import AlbumArea from 'components/widgets/Article/Album'
import style from '../index.module.scss'

interface Props {
  albumserch: string
  articlesLike: ArticlesType[]
}

export default function AlbumLike(props: Props): JSX.Element {
  const { articlesLike, albumserch } = props

  const [albumLikeData, setAlbumLikeData] = useState<ArticlesType[]>(articlesLike)
  const articlesNewFilter = albumLikeData.filter(
    (article) => article.title.includes(albumserch) || article.content.includes(albumserch),
  )

  useEffect(() => {
    const detaFetch = async (): Promise<void> => {
      const resLike = await apiClient.get('/article/all/content/order/like')
      if (resLike.status !== HttpStatusCode.Ok) throw Error
      setAlbumLikeData(resLike.data.articleTopLike)
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
