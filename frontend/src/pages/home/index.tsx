import Home from '@/components/template/home'
import apiClient from '@/libs/apiClient'
import { ArticleProps } from '@/types/global'
import { GetServerSideProps } from 'next'

const HomePage = ({ articles }: { articles: ArticleProps }) => {
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
        articles: null,
      },
    }
  }
}
