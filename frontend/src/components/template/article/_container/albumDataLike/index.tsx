import React from 'react'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import ArticleArea from 'components/widgets/Article'

interface Props {
  albumserch: string
  articlesLike: ArticlesType[]
}

export default function AlbumLike(props: Props): JSX.Element {
  const { articlesLike, albumserch } = props
  return (
    <ArticleArea>
      {articlesLike?.map((album) => <ArticleCard album={album} key={album.id} />)}
    </ArticleArea>
  )
}
