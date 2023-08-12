import style from './Home.module.scss'
import CategoriesPart from './categories'
import ArticlesPart from './articles'
import { ArticleProps } from '@/types/global'
import BasicAlerts from '@/components/parts/Alart'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import SwiperArea from '@/components/parts/Swiper'

interface Props {
  articles: ArticleProps
}

const Home = (props: Props) => {
  const { articles } = props
  const { userId } = useSelector((state: RootState) => state.user)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    if (userId) {
      setShowAlert(true)

      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [userId])

  return (
    <div className={style.home}>
      <div className={style.swiper}>
        <SwiperArea />
      </div>
      <CategoriesPart />
      <ArticlesPart articles={articles} />
      <div className={style.login_alert}>
        {showAlert && <BasicAlerts contents='This is a success alert — ログインに成功しました' />}
      </div>
    </div>
  )
}

export default Home
