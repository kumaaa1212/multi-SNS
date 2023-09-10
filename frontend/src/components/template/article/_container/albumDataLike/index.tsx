import React from 'react'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import ArticleArea from 'components/widgets/article'
import style from '../../Article.module.scss'

interface Props {
  albumserch: string
  articlesLike: ArticlesType[]
}

const AlbumLike = (props: Props): JSX.Element => {
  const { articlesLike, albumserch } = props
  return (
    <ArticleArea>
      <div className={style.card_area}>
        {articlesLike?.map((album) => (
          <div key={album.id}>
            <ArticleCard article={album} />
          </div>
        ))}
      </div>
    </ArticleArea>
  )
}

export default AlbumLike
