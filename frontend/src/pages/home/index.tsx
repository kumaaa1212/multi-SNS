import { GetServerSideProps } from 'next'
import Home from 'components/template/home'
import apiClient from 'libs/apiClient'
import { ArticlesType, LabelType } from 'types/internal/album'
import { TweetsType } from 'types/internal/tweet'

export const getServerSideProps: GetServerSideProps = async () => {
  const [albumsData, tweetsData, labelsData] = await Promise.all([
    apiClient.get('/post/all/album/top'),
    apiClient.get('/post/all/tweet/top'),
    apiClient.get('/post/album/labels'),
  ])
  if (albumsData.status !== 200 || tweetsData.status !== 200 || labelsData.status !== 200)
    throw Error
  return {
    props: {
      albums: albumsData.data.topAlbumLikedContent,
      tweets: tweetsData.data.topTweetLikedContent,
      labels: labelsData.data.albumLabels,
    },
  }
}

interface Props {
  albums: ArticlesType[]
  tweets: TweetsType[]
  labels: LabelType[]
}

export default function HomePage(props: Props): JSX.Element {
  const { albums, tweets, labels } = props

  return <Home albums={albums} tweets={tweets} labels={labels} />
}
