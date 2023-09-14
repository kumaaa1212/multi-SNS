import React from 'react'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import ArticleArea from 'components/widgets/Article'

interface Props {
  albumserch: string
  articlesNew: ArticlesType[]
}

const AlbumNew = (props: Props): JSX.Element => {
  const { articlesNew, albumserch } = props
  const articlesNewFilter = articlesNew.filter((article) => article.title.includes(albumserch))
  return (
    <ArticleArea>
      {articlesNewFilter?.map((album: ArticlesType) => (
        <ArticleCard album={album} key={album.id} />
      ))}
    </ArticleArea>
  )
}

export default AlbumNew
