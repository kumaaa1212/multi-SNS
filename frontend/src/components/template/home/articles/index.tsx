import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import style from '../Home.module.scss'
import { ArticleProps, ArticlesType } from '@/types/global'
import ArticleCard from '@/components/parts/Card/Articles'
import { AnyARecord } from 'dns'
import Image from 'next/image'
import TweetCard from '@/components/parts/Card/Tweet'

interface Props {
  articles: any
}

const ArticlesPart = (props: Props) => {
  const { articles } = props

  const [albumData, setAlbumData] = useState<ArticlesType[]>(articles)
  const router = useRouter()

  const ablusData = () => {
    const arry = albumData.map((item: any) => {
      if ('thumbnailImg' in item) {
        return <ArticleCard key={item.id} setAlbumData={setAlbumData} article={item} />
      } else {
        return <TweetCard key={item.id} tweet={item} setAlbumData={setAlbumData} />
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
      <div className={style.home_articles}>
        {articles && ablusData()}
      </div>
      <button className={style.all_articles} onClick={() => router.push('/articles')}>
        全ての記事を見る
      </button>
    </div>
  )
}

export default ArticlesPart
