import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import BasicTabs from './_container/list'
import Profile from './_container/profile'

export default function Mapage(): JSX.Element {
  return (
    <Layout>
      <Meta title='マイページ' />
      <Profile />
      <BasicTabs />
    </Layout>
  )
}
