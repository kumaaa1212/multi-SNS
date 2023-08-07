import style from './Home.module.scss'
import CategoriesPart from './categories'
import ArticlesPart from './articles'
import { ArticleProps } from '@/types/global'

interface Props {
  articles: ArticleProps
}

const Home = (props:Props) => {
  const { articles } = props

  return (
    <div className={style.home}>
      <div className={style.swiper}>
        酢ワイパー
      </div>
      <CategoriesPart />
      <ArticlesPart />
    </div>
  )
}

export default Home