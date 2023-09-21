import { GetServerSideProps } from 'next'
import { HttpStatusCode } from 'axios'
import Tweets from 'components/template/tweets'
import apiClient from 'libs/apiClient'
import { TweetsType } from 'types/internal'

export const getServerSideProps: GetServerSideProps = async () => {
  const [resLike, resnew] = await Promise.all([
    apiClient.get('/article/all/tweets/order/like'),
    apiClient.get('/article/all/tweets/order/new'),
  ])
  if (resLike.status !== HttpStatusCode.Ok || resnew.status !== HttpStatusCode.Ok) throw Error

  return {
    props: {
      tweetsLike: resLike.data.tweetsTopLike,
      tweetsNew: resnew.data.tweetsTopNew,
    },
  }
}

interface Props {
  tweetsLike: TweetsType[]
  tweetsNew: TweetsType[]
}

export default function TweetsPage(props: Props): JSX.Element {
  const { tweetsLike, tweetsNew } = props

  return <Tweets tweetsLike={tweetsLike} tweetsNew={tweetsNew} />
}
