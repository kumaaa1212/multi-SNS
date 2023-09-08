import { GetServerSideProps } from 'next'
import Home from 'components/template/home'
import apiClient from 'libs/apiClient'
import { ArticlesType, TweetsType } from 'types/global'

interface Props {
  articles: ArticlesType[] | TweetsType[]
}

export const HomePage = (props: Props): JSX.Element => {
  const { articles } = props

  return <Home articles={articles} />
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await apiClient.get('/post/all/content/top')
    const articles = res.data

    return {
      props: {
        articles,
      },
    }
  } catch {
    return {
      props: {
        articles: [],
      },
    }
  }
}
