import { GetServerSideProps } from 'next'
import { HttpStatusCode } from 'axios'
import Albums from 'components/template/article'
import apiClient from 'libs/apiClient'
import { ArticlesType } from 'types/internal'

export const getServerSideProps: GetServerSideProps = async () => {
  const [resLike, resnew] = await Promise.all([
    apiClient.get('/article/all/content/order/like'),
    apiClient.get('/article/all/content/order/new'),
  ])
  if (resLike.status !== HttpStatusCode.Ok || resnew.status !== HttpStatusCode.Ok) throw Error

  return {
    props: {
      articlesLike: resLike.data.articleTopLike,
      articlesNew: resnew.data.articleTopNew,
    },
  }
}

interface Props {
  articlesLike: ArticlesType[]
  articlesNew: ArticlesType[]
}

export default function ArticlePage(props: Props): JSX.Element {
  const { articlesLike, articlesNew } = props

  return <Albums articlesLike={articlesLike} articlesNew={articlesNew} />
}
