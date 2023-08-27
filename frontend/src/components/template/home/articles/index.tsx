import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import style from '../Home.module.scss'
import { ArticlesType, TweetsType } from '@/types/global'
import ArticleCard from '@/components/parts/Card/Articles'
import TweetCard from '@/components/parts/Card/Tweet'

interface Props {
  articles: ArticlesType[] | TweetsType[]
}

const ArticlesPart = (props: Props) => {
  const { articles } = props

  const [albumData, setAlbumData] = useState<ArticlesType[] | TweetsType[]>(articles)
  const router = useRouter()

  const ablusData = () => {
    const arry = albumData?.map((item: any) => {
      if ('thumbnailImg' in item) {
        return <ArticleCard key={item.id} article={item} />
      } else {
        return <TweetCard key={item.id} tweet={item} />
      }
    })
    return arry
  }

  return (
    <div className={style.articles_area}>
      <div className={style.articles_title}>
        <h2>評価の高い記事</h2>
        <Link href='/articles' className={style.show_all}>
          全ての記事を見る
        </Link>
      </div>
      <div className={style.home_articles}>{articles && ablusData()}</div>
      <button className={style.all_articles} onClick={() => router.push('/articles')}>
        全ての記事を見る
      </button>
    </div>
  )
}

export default ArticlesPart
