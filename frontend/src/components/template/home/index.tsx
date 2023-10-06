import { useState } from 'react'
import Layout from 'components/layout'
import { ArticlesType, LabelType } from 'types/internal/album'
import { TweetsType } from 'types/internal/tweet'
import AlbumParts from './_container/album'
import CategoriesPart from './_container/categories'
import TweetParts from './_container/tweet'

interface Props {
  albums: ArticlesType[]
  tweets: TweetsType[]
  labels: LabelType[]
}

export default function Home(props: Props): JSX.Element {
  const { albums, tweets, labels } = props
  const [loaindg, setLoaindg] = useState<boolean>(false)
  return (
    <Layout loadingAll={loaindg}>
      <CategoriesPart labels={labels} />
      <TweetParts tweets={tweets} setLoaindg={setLoaindg} />
      <AlbumParts albums={albums} />
    </Layout>
  )
}
