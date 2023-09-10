import { GetServerSideProps } from 'next'
import Article from 'components/template/article'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/global'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resLike = await apiClient.get('/article/all/content/order/like')
    const resnew = await apiClient.get('/article/all/content/order/new')
    const articlesLike = resLike.data.articleTopLike
    const articlesNew = resnew.data.articleTopNew
    return {
      props: {
        articlesLike,
        articlesNew,
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

interface Props {
  articlesLike: ArticlesType[]
  articlesNew: ArticlesType[]
}

const ArticlePage = ({ articlesLike, articlesNew }: Props): JSX.Element => {
  return <Article articlesLike={articlesLike} articlesNew={articlesNew} />
}

export default ArticlePage
