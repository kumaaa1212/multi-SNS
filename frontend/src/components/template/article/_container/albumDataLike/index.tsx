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

  const articlesNewFilter = articlesLike.filter(
    (article) => article.title.includes(albumserch) || article.content.includes(albumserch),
  )

  return (
    <ArticleArea>
      {articlesNewFilter?.map((album) => <ArticleCard album={album} key={album.id} />)}
    </ArticleArea>
  )
}
