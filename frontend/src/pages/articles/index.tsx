import { GetServerSideProps } from 'next'
import Article from 'components/template/article'
import apiClient from 'libs/apiClient'
import { ArticlesType, TweetsType } from 'types/global'

interface Props {
  articlesLike: ArticlesType[] | TweetsType[]
  articlesNew: ArticlesType[] | TweetsType[]
}

const ArticlePage = ({ articlesLike, articlesNew }: Props): JSX.Element => {
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
