import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import style from '../Home.module.scss'
import { ArticleProps } from '@/types/global'

interface Props {
  articles: ArticleProps
}

const ArticlesPart = (props:Props) => {
  const { articles } = props
  const router = useRouter()
  
  return (
    <div className={style.articles_area}>
      <div className={style.articles_title}>
        <h2>評価の高い記事</h2>
        <Link href='/articles' className={style.show_all}>
          全ての記事を見る
        </Link>
      </div>
      <div className={style.home_articles}>{/* <ArticleCard/> */}</div>
      <button className={style.all_articles} onClick={() => router.push('/articles')}>
        全ての記事を見る
      </button>
    </div>
  )
}

export default ArticlesPart
