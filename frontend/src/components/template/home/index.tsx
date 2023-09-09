import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { ArticlesType, TweetsType } from 'types/global'
import BasicAlerts from 'components/parts/Alart'
import SwiperArea from 'components/widgets/Swiper'
import style from './Home.module.scss'
import ArticlesPart from './articles'
import CategoriesPart from './categories'

interface Props {
  articles: ArticlesType[] | TweetsType[]
}

const Home = (props: Props): JSX.Element => {
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
