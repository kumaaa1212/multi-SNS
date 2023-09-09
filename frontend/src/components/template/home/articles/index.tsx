import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArticlesType, TweetsType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import TweetCard from 'components/parts/Card/Tweet'
import style from '../Home.module.scss'

interface Props {
  articles: ArticlesType[] | TweetsType[]
}

const ArticlesPart = (props: Props): JSX.Element => {
  const { articles } = props

  const router = useRouter()

  const fliterCard = articles?.map((item: ArticlesType | TweetsType) => {
    if ('thumbnailImg' in item && " 'thumbnailText" in item) {
      return <ArticleCard key={item.id} article={item} />
    } else {
      return <TweetCard key={item.id} tweet={item} />
    }
  })

  return (
    <div className={style.articles_area}>
      <div className={style.articles_title}>
        <h2>評価の高い記事</h2>
        <Link href='/articles' className={style.show_all}>
          全ての記事を見る
        </Link>
      </div>
      {/* <div className={style.home_articles}>{articles && fliterCard}</div> */}
      <button
        className={style.all_articles}
        onClick={(): void => {
          router.push('/articles')
        }}
      >
        全ての記事を見る
      </button>
    </div>
  )
}

export default ArticlesPart
