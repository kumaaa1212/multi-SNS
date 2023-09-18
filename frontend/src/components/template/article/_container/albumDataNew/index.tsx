import React from 'react'
import { Grid } from '@mui/material'
import { ArticlesType } from 'types/global'
import ArticleCard from 'components/parts/Card/Album'
import ArticleArea from 'components/widgets/Article'

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
    <ArticleArea>
      {articlesNewFilter?.map((album: ArticlesType, index: number) => (
        <Grid xs={1} sm={1} md={1} key={index}>
          <ArticleCard album={album} key={album.id} />
        </Grid>
      ))}
    </ArticleArea>
  )
}
