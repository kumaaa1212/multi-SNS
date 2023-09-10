import React from 'react'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import ArticleArea from 'components/widgets/article'

interface Props {
  albumserch: string
  articlesNew: ArticlesType[]
}

const AlbumNew = (props: Props): JSX.Element => {
  const { articlesNew, albumserch } = props
  return (
    <ArticleArea>
      {articlesNew?.map((album: ArticlesType) => <ArticleCard article={album} key={album.id} />)}
    </ArticleArea>
  )
}

export default AlbumNew
