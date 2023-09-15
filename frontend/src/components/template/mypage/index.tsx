import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import Profile from './_container/profile'
import BasicTabs from './_container/timeline'

export default function Mapage(): JSX.Element {
  return (
    <Layout>
      <Meta title='マイページ' />
      <Profile />
      <BasicTabs />
    </Layout>
  )
}
