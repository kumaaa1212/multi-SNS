import React from 'react'
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

  const articlesNewFilter = articlesLike.filter(
    (article) => article.title.includes(albumserch) || article.content.includes(albumserch),
  )

  return (
    <AlbumArea>
      {articlesNewFilter?.map((tweet) => (
        <>
          <div className={style.large}>
            <ArticleCard album={tweet} key={tweet.id} />
          </div>
          <div className={style.small}>
            <HomeAlbumCard album={tweet} />
          </div>
        </>
      ))}
    </AlbumArea>
  )
}
