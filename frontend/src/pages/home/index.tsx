import Home from '@/components/template/home'
import apiClient from '@/libs/apiClient'
import { ArticlesType, TweetsType } from '@/types/global'
import { GetServerSideProps } from 'next'

interface Props {
  articles: ArticlesType[]
  tweets: TweetsType[]
}

export const HomePage = ({ articles }: { articles: Props }) => {

  return <Home articles={articles} />
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {

  try {
    const res = await apiClient.get('/post/all/content')
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
