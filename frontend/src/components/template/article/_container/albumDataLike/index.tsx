import React from 'react'
import { ArticlesType } from 'types/internal'
import ArticleCard from 'components/parts/Card/Album'
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
