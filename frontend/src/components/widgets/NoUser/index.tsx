import Image from 'next/image'
import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import style from './NoUser.module.scss'

interface Props {
  contens: string
}

export default function NoUser(props: Props): JSX.Element {
  const { contens } = props

  return (
    <Layout>
      <Meta />
      <div className={style.no_user}>
        <h1>No User</h1>
        <p>ログインされていません。</p>
        <p>ログインすると{contens}を確認することができます。</p>
        <Image
          src='/404.jpg'
          width={600}
          height={500}
          alt='404の画像'
          className={style.no_user_img}
          priority
        />
      </div>
    </Layout>
  )
}
