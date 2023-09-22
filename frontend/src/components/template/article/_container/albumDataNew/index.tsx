import React from 'react'
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

  const articlesNewFilter = articlesNew.filter(
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
