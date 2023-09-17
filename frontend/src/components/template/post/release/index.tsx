import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import Layout from 'components/layout'
import Meta from 'components/layout/Head'
import ReleaseCard from 'components/parts/Card/Post/Release'
import style from './Release.module.scss'

const Release = (): JSX.Element => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  return (
    <Layout>
      <Meta title='投稿完了' />
      <ReactConfetti width={width} height={height} numberOfPieces={400} recycle={false} />
      <div className={style.release_contents}>
        <h1 className={style.release_title}>Congratulations!</h1>
        <ReleaseCard className='600' />
      </div>
    </Layout>
  )
}

export default Release
