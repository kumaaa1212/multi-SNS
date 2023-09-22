import Image from 'next/image'
import Layout from 'components/layout'

export default function Custom404(): JSX.Element {
  return (
    <Layout>
      <div className='not_page'>
        <h1>404</h1>
        <p>このページはすでに削除されているか、URLが間違っている可能性があります。</p>
        <Image src='/404.jpg' width={600} height={500} alt='404の画像' className='not_page_img' />
      </div>
    </Layout>
  )
}
