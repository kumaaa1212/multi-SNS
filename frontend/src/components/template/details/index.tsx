import { jLeagueTeams } from '@/TeamData'
import LabelArea from '@/components/parts/Label/articles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import style from './ArticleDetail.module.scss'
import ArticleCard from '@/components/parts/Card/Articles'
const Team = ({ data }: any) => {
  const router = useRouter()
  const teamfilter = jLeagueTeams.filter((team) => team.label === router.query.label)
  console.log(teamfilter)
  console.log(data)
  return (
    <div className={style.articles_details}>
      <div className={style.articles_details_show}>
        <div className={style.articles_details_header}>
          <Image
            src={teamfilter[0].img}
            alt={''}
            width={100}
            height={100}
            className={style.team_img}
          />
          <h2>{`"${teamfilter[0].name}"に関するまとめ`}</h2>
        </div>
        {data ? (
          <div>
            {data?.map((article: any) => (
              <div key={article.label} className={style.article_timeline}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <h1>まだ投稿がありません</h1>
        )}
      </div>
      <div className={style.labels_area}>
        <LabelArea />
      </div>
    </div>
  )
}

export default Team
