import { ArticlesType } from 'types/internal/album'
import HomeAlbumCard from 'components/parts/Card/Home/Album'
import HomeTemplate from 'components/widgets/home'
import stlye from './Album.module.scss'

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
        color='white'
      >
        <div className={stlye.main}>
          {albums.map((album) => (
            <HomeAlbumCard album={album} key={album.id} />
          ))}
        </div>
      </HomeTemplate>
    </div>
  )
}
