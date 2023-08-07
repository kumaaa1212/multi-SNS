import { GetServerSideProps } from 'next'
import { ArticleProps } from '@/types/global'
import Article from '@/components/template/article'
import apiClient from '@/libs/apiClient'

const ArticlePage = ({ articles }:{articles:ArticleProps}) => {
  return <Article articles={articles} />
}

export default ArticlePage

export const getServerSideProps:GetServerSideProps = async () => {
  const res = await apiClient.get('/post/all/album')
  const articles = res.data

  return {
    props: {
      articles,
    },
  }
}
