import { Grid } from '@mui/material'
import { ArticlesType } from 'types/global'
import AlbumCard from 'components/parts/Card/Articles'
import HomeTemplate from 'components/widgets/home'

interface Props {
  albums: ArticlesType[]
}

export default function AlbumParts(props: Props): JSX.Element {
  const { albums } = props

  return (
    <div>
      <HomeTemplate
        titile='評価の高い記事'
        showAll='全ての記事を見る'
        href='/album'
        footerShowAll='全ての記事を見る'
      >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3 }}>
          {albums.map((album) => (
            <Grid item xs={1} sm={1} md={1} key={album.id}>
              <AlbumCard key={album.id} album={album as ArticlesType} />
            </Grid>
          ))}
        </Grid>
      </HomeTemplate>
    </div>
  )
}
