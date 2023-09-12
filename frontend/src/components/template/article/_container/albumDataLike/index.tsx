import React from 'react'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import ArticleArea from 'components/widgets/Article'
import style from '../../Article.module.scss'

interface Props {
  albumserch: string
  articlesLike: ArticlesType[]
}

const AlbumLike = (props: Props): JSX.Element => {
  const { articlesLike, albumserch } = props
  return (
    <ArticleArea>
      {articlesLike?.map((album) => <ArticleCard article={album} key={album.id} />)}
    </ArticleArea>
  )
}

export default AlbumLike
