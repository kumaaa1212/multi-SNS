import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from 'components/hooks/useToast'
import { RootState } from 'store/store'
import { ArticlesType, LabelType, TweetsType } from 'types/global'
import ToastBase from 'components/parts/Toast'
import SwiperArea from 'components/widgets/Swiper'
import ArticlesPart from './details/album'
import CategoriesPart from './details/categories'
import TweetParts from './details/tweet'

interface Props {
  albums: ArticlesType[]
  tweets: TweetsType[]
  labels: LabelType[]
}

const Home = (props: Props): JSX.Element => {
  const { albums, tweets, labels } = props

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
    <>
      <SwiperArea />
      <CategoriesPart labels={labels} />
      <TweetParts tweets={tweets} />
      <ArticlesPart albums={albums} />
      {showAlert && <ToastBase content={toastContent} isError={isError} active={isToast} />}
    </>
  )
}

export default Home
