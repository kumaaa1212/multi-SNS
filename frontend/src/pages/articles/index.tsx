import { GetServerSideProps } from 'next'
import { ArticleProps, ArticlesType, TweetsType } from '@/types/global'
import Article from '@/components/template/article'
import apiClient from '@/libs/apiClient'

interface Props {
  articlesLike: ArticlesType[] | TweetsType[]
  articlesNew: ArticlesType[] | TweetsType[]
}

const ArticlePage = ({ articlesLike, articlesNew }: Props) => {
  return <Article articlesLike={articlesLike} articlesNew={articlesNew} />
}

export default ArticlePage

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resLike = await apiClient.get('/post/all/content')
    const resnew = await apiClient.get('/post/all/content/new')
    const articlesLike = resLike.data
    const articlesNew = resnew.data
    return {
      props: {
        articlesLike,
        articlesNew,
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
