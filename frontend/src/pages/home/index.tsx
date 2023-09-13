import { GetServerSideProps } from 'next'
import Home from 'components/template/home'
import apiClient from 'libs/apiClient'
import { ArticlesType, LabelType, TweetsType } from 'types/global'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const albumsData = await apiClient.get('/post/all/album/top')
    const tweetsData = await apiClient.get('/post/all/tweet/top')
    const labelsData = await apiClient.get('/post/album/labels')
    const albums = albumsData.data
    const tweets = tweetsData.data
    const labels = labelsData.data
    return {
      props: {
        albums: albums.topAlbumLikedContent,
        tweets: tweets.topTweetLikedContent,
        labels: labels.albumLabels,
      },
    }
  } catch {
    return {
      props: {
        albums: [],
        tweets: [],
        labels: [],
      },
    }
  }
}
interface Props {
  albums: ArticlesType[]
  tweets: TweetsType[]
  labels: LabelType[]
}

export const HomePage = (props: Props): JSX.Element => {
  const { albums, tweets, labels } = props

  return <Home albums={albums} tweets={tweets} labels={labels} />
}

export default HomePage
