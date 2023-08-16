import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import style from '../Home.module.scss'
import { ArticleProps, ArticlesType } from '@/types/global'
import ArticleCard from '@/components/parts/Card/Articles'

interface Props {
  articles: ArticleProps
}

const ArticlesPart = (props: Props) => {
  const { articles } = props

  const [albumData, setAlbumData] = useState<ArticlesType[]>(articles.posts)
  const router = useRouter()

  return (
    <div className={style.articles_area}>
      <div className={style.articles_title}>
        <h2>評価の高い記事</h2>
        <Link href='/articles' className={style.show_all}>
          全ての記事を見る
        </Link>
      </div>
      {/* <div className={style.home_articles}>
        {albumData.slice(0, 4).map((article: ArticlesType) => (
          <ArticleCard article={article} setAlbumData={setAlbumData} />
        ))}
      </div> */}
      <button className={style.all_articles} onClick={() => router.push('/articles')}>
        全ての記事を見る
      </button>
    </div>
  )
}

export default ArticlesPart
