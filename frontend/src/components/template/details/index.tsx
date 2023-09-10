import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { jLeagueTeams } from 'utils/TeamData'
import { ArticlesType, TeamDataType } from 'types/global'
import ArticleCard from 'components/parts/Card/Articles'
import LabelArea from 'components/parts/Label/articles'
import style from './ArticleDetail.module.scss'

interface Props {
  data: ArticlesType[] | undefined
}

const Team = (props: Props): JSX.Element => {
  const { data } = props

  const [albumData, setAlbumData] = useState<ArticlesType[]>(data ? data : [])

  const router = useRouter()
  const teamfilter = jLeagueTeams.filter((team: TeamDataType) => team.label === router.query.label)

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
        <div className={style.article_area}>
          {data ? (
            <div>
              {/* {data?.map((article: ArticlesType) => (
                <div key={article.id} className={style.article_timeline}>
                  <ArticleCard article={article} setAlbumData={setAlbumData} />
                </div>
              ))} */}
            </div>
          ) : (
            <h1>まだ投稿がありません</h1>
          )}
        </div>
      </div>
      <div className={style.labels_area}>
        <LabelArea />
      </div>
    </div>
  )
}

export default Team
