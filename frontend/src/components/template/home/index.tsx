import Layout from 'components/layout'
import { ArticlesType, LabelType } from 'types/internal/album'
import { TweetsType } from 'types/internal/tweet'
import AlbumParts from './details/album'
import CategoriesPart from './details/categories'
import TweetParts from './details/tweet'

interface Props {
  albums: ArticlesType[]
  tweets: TweetsType[]
  labels: LabelType[]
}

export default function Home(props: Props): JSX.Element {
  const { albums, tweets, labels } = props

  return (
    <Layout>
      <CategoriesPart labels={labels} />
      <TweetParts tweets={tweets} />
      <AlbumParts albums={albums} />
    </Layout>
  )
}
