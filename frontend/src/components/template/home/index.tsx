import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from 'components/hooks/useToast'
import { RootState } from 'store/store'
import { ArticlesType, TweetsType } from 'types/global'
import ToastBase from 'components/parts/Toast'
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
  const { toastContent, isError, isToast, toastFunc } = useToast()

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
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
      {showAlert && <ToastBase content={toastContent} isError={isError} active={isToast} />}
    </div>
  )
}

export default Home
